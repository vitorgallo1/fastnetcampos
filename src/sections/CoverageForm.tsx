import { AnimatePresence, m } from 'framer-motion';
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, MapPin } from 'lucide-react';
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { site } from '@/config/site';
import { cn } from '@/lib/cn';
import { CepNotFoundError, formatCep, lookupCep, onlyDigits, type CepAddress } from '@/lib/cep';
import { messages, whatsappUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from '@/components/ui/BrandIcons';
import { Button } from '@/components/ui/Button';

type CepState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'found'; address: CepAddress }
  | { status: 'not-found' }
  | { status: 'unavailable' };

type Result =
  | { kind: 'sent'; href: string }
  | { kind: 'api'; status: 'available' | 'unavailable' | 'unknown'; message?: string; href: string };

type Errors = Partial<Record<'cep' | 'number' | 'address', string>>;

export function CoverageForm() {
  const ids = { cep: useId(), number: useId(), complement: useId(), address: useId(), name: useId() };
  const [mode, setMode] = useState<'cep' | 'address'>('cep');
  const [cep, setCep] = useState('');
  const [cepState, setCepState] = useState<CepState>({ status: 'idle' });
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Busca o endereço assim que o CEP estiver completo.
  useEffect(() => {
    const digits = onlyDigits(cep);
    if (digits.length !== 8) {
      setCepState({ status: 'idle' });
      return;
    }
    const controller = new AbortController();
    setCepState({ status: 'loading' });
    lookupCep(digits, controller.signal)
      .then((found) => setCepState({ status: 'found', address: found }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setCepState(error instanceof CepNotFoundError ? { status: 'not-found' } : { status: 'unavailable' });
      });
    return () => controller.abort();
  }, [cep]);

  useEffect(() => {
    if (result) resultRef.current?.focus();
  }, [result]);

  function validate(): Errors {
    const next: Errors = {};
    if (mode === 'cep') {
      const digits = onlyDigits(cep);
      if (digits.length === 0) next.cep = 'Informe o seu CEP.';
      else if (digits.length !== 8) next.cep = 'O CEP deve ter 8 números.';
      else if (cepState.status === 'not-found') next.cep = 'CEP não encontrado. Confira ou informe o endereço completo.';
      if (!number.trim()) next.number = 'Informe o número.';
    } else if (address.trim().length < 10) {
      next.address = 'Informe rua, número, bairro e cidade.';
    }
    return next;
  }

  function describeAddress() {
    if (mode === 'address') return address.trim();
    const parts =
      cepState.status === 'found'
        ? [
            [cepState.address.street, number.trim()].filter(Boolean).join(', '),
            complement.trim(),
            cepState.address.district,
            `${cepState.address.city}/${cepState.address.state}`,
          ]
        : [`Número ${number.trim()}`, complement.trim()];
    return [...parts.filter(Boolean), `CEP ${formatCep(cep)}`].join(' — ');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstField = found.cep ? ids.cep : found.number ? ids.number : ids.address;
      document.getElementById(firstField)?.focus();
      return;
    }

    const fullAddress = describeAddress();
    const href = whatsappUrl(messages.coverage(fullAddress, name.trim() || undefined));

    if (!site.coverage.apiUrl) {
      // Sem integração com o sistema de viabilidade: a equipe comercial confirma pelo WhatsApp.
      window.open(href, '_blank', 'noopener,noreferrer');
      setResult({ kind: 'sent', href });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(site.coverage.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cep: onlyDigits(cep), numero: number.trim(), endereco: fullAddress }),
      });
      if (!response.ok) throw new Error(String(response.status));
      const data = (await response.json()) as { status?: string; message?: string };
      const status = data.status === 'available' || data.status === 'unavailable' ? data.status : 'unknown';
      setResult({ kind: 'api', status, message: data.message, href });
    } catch {
      setResult({ kind: 'api', status: 'unknown', href });
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setResult(null);
  }

  return (
    <div className="rounded-card bg-white p-6 text-navy shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)] sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {result ? (
          <m.div
            key="result"
            ref={resultRef}
            tabIndex={-1}
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="outline-none"
          >
            <ResultView result={result} onReset={reset} />
          </m.div>
        ) : (
          <m.form
            key="form"
            noValidate
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            aria-describedby={`${ids.cep}-intro`}
          >
            <h3 className="font-display text-xl font-bold">Consulte a disponibilidade</h3>
            <p id={`${ids.cep}-intro`} className="mt-1.5 text-[0.9rem] text-ink-muted">
              Informe o endereço de instalação e nossa equipe confirma a cobertura.
            </p>

            <div className="mt-6 space-y-4">
              {mode === 'cep' ? (
                <>
                  <div className="grid grid-cols-[1fr_6.5rem] gap-3">
                    <Field id={ids.cep} label="CEP" error={errors.cep} hint={<CepHint state={cepState} />}>
                      <input
                        id={ids.cep}
                        name="cep"
                        inputMode="numeric"
                        autoComplete="postal-code"
                        placeholder="00000-000"
                        value={cep}
                        onChange={(e) => {
                          setCep(formatCep(e.target.value));
                          setErrors((prev) => ({ ...prev, cep: undefined }));
                        }}
                        aria-invalid={Boolean(errors.cep)}
                        aria-describedby={`${ids.cep}-msg`}
                        className={inputClass(Boolean(errors.cep))}
                      />
                    </Field>
                    <Field id={ids.number} label="Número" error={errors.number}>
                      <input
                        id={ids.number}
                        name="numero"
                        inputMode="numeric"
                        value={number}
                        onChange={(e) => {
                          setNumber(e.target.value.slice(0, 10));
                          setErrors((prev) => ({ ...prev, number: undefined }));
                        }}
                        aria-invalid={Boolean(errors.number)}
                        aria-describedby={`${ids.number}-msg`}
                        className={inputClass(Boolean(errors.number))}
                      />
                    </Field>
                  </div>
                  <Field id={ids.complement} label="Complemento ou referência" optional>
                    <input
                      id={ids.complement}
                      name="complemento"
                      autoComplete="address-line2"
                      value={complement}
                      onChange={(e) => setComplement(e.target.value.slice(0, 80))}
                      className={inputClass(false)}
                    />
                  </Field>
                </>
              ) : (
                <Field id={ids.address} label="Endereço completo" error={errors.address}>
                  <textarea
                    id={ids.address}
                    name="endereco"
                    rows={3}
                    autoComplete="street-address"
                    placeholder="Rua, número, bairro e cidade"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value.slice(0, 240));
                      setErrors((prev) => ({ ...prev, address: undefined }));
                    }}
                    aria-invalid={Boolean(errors.address)}
                    aria-describedby={`${ids.address}-msg`}
                    className={cn(inputClass(Boolean(errors.address)), 'h-auto resize-none py-3')}
                  />
                </Field>
              )}

              <Field id={ids.name} label="Seu nome" optional>
                <input
                  id={ids.name}
                  name="nome"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value.slice(0, 80))}
                  className={inputClass(false)}
                />
              </Field>
            </div>

            <button
              type="button"
              onClick={() => {
                setMode((m) => (m === 'cep' ? 'address' : 'cep'));
                setErrors({});
              }}
              className="mt-4 text-[0.85rem] font-semibold text-electric underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
            >
              {mode === 'cep' ? 'Não sei meu CEP' : 'Prefiro informar o CEP'}
            </button>

            <Button type="submit" size="lg" className="mt-6 w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                  Consultando…
                </>
              ) : (
                <>
                  Consultar minha cobertura
                  <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </Button>
            {!site.coverage.apiUrl && (
              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[0.78rem] text-ink-muted">
                <WhatsAppIcon size={13} className="text-whatsapp" />
                A consulta é enviada para o nosso WhatsApp comercial.
              </p>
            )}
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function ResultView({ result, onReset }: { result: Result; onReset: () => void }) {
  const content = {
    sent: {
      icon: <CheckCircle2 className="text-whatsapp" size={28} aria-hidden="true" />,
      title: 'Consulta pronta no WhatsApp',
      text: 'Abrimos o WhatsApp com o seu endereço. Envie a mensagem e nossa equipe confirma a disponibilidade.',
    },
    available: {
      icon: <CheckCircle2 className="text-whatsapp" size={28} aria-hidden="true" />,
      title: 'Seu endereço tem cobertura',
      text: 'Fale com a nossa equipe para escolher o plano e agendar a instalação.',
    },
    unavailable: {
      icon: <AlertCircle className="text-electric" size={28} aria-hidden="true" />,
      title: 'Ainda não atendemos este endereço',
      text: 'Fale com a nossa equipe para saber sobre a expansão da rede na sua região.',
    },
    unknown: {
      icon: <AlertCircle className="text-electric" size={28} aria-hidden="true" />,
      title: 'Precisamos verificar o seu endereço',
      text: 'Não foi possível concluir a consulta automática. Envie seu endereço pelo WhatsApp e nossa equipe confirma.',
    },
  }[result.kind === 'sent' ? 'sent' : result.status];

  return (
    <div>
      {content.icon}
      <h3 className="mt-4 font-display text-xl font-bold">{content.title}</h3>
      <p className="mt-2 text-[0.93rem] leading-relaxed text-ink-muted">
        {result.kind === 'api' && result.message ? result.message : content.text}
      </p>
      <Button href={result.href} external variant="whatsapp" size="lg" className="mt-6 w-full">
        <WhatsAppIcon size={18} />
        {result.kind === 'sent' ? 'Abrir o WhatsApp novamente' : 'Falar no WhatsApp'}
      </Button>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 w-full text-center text-[0.85rem] font-semibold text-electric underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
      >
        Consultar outro endereço
      </button>
    </div>
  );
}

function CepHint({ state }: { state: CepState }) {
  switch (state.status) {
    case 'loading':
      return (
        <span className="flex items-center gap-1.5">
          <Loader2 size={13} className="animate-spin" aria-hidden="true" /> Buscando endereço…
        </span>
      );
    case 'found': {
      const { street, district, city, state: uf } = state.address;
      return (
        <span className="flex items-start gap-1.5 text-navy">
          <MapPin size={13} className="mt-0.5 shrink-0 text-electric" aria-hidden="true" />
          {[street, district, `${city}/${uf}`].filter(Boolean).join(', ')}
        </span>
      );
    }
    case 'not-found':
      return <span className="text-red-700">CEP não encontrado.</span>;
    case 'unavailable':
      return <span>Não foi possível buscar o endereço agora. Você pode continuar.</span>;
    default:
      return null;
  }
}

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-[0.82rem] font-semibold text-navy">
        {label}
        {optional && <span className="font-normal text-ink-muted"> (opcional)</span>}
      </label>
      {children}
      <p id={`${id}-msg`} aria-live="polite" className={cn('mt-1.5 min-h-0 text-[0.78rem]', error ? 'text-red-700' : 'text-ink-muted')}>
        {error ?? hint}
      </p>
    </div>
  );
}

function inputClass(invalid: boolean) {
  return cn(
    'h-12 w-full rounded-[10px] border bg-white px-4 text-[0.95rem] text-navy placeholder:text-[#8A98B0]',
    'transition-[border-color,box-shadow] focus:outline-none focus:ring-4',
    invalid
      ? 'border-red-600 focus:border-red-600 focus:ring-red-600/15'
      : 'border-[#D3DDEB] hover:border-[#B5C4DA] focus:border-electric focus:ring-electric/15',
  );
}
