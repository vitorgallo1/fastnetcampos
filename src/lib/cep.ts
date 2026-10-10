export type CepAddress = {
  cep: string;
  street: string;
  district: string;
  city: string;
  state: string;
};

export const onlyDigits = (value: string) => value.replace(/\D/g, '');

export function formatCep(value: string) {
  const digits = onlyDigits(value).slice(0, 8);
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
}

export class CepNotFoundError extends Error {}

/** Consulta o endereço do CEP na base pública dos Correios via ViaCEP. */
export async function lookupCep(cep: string, signal?: AbortSignal): Promise<CepAddress> {
  const digits = onlyDigits(cep);
  const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`, { signal });
  if (!response.ok) throw new Error('Falha na consulta do CEP');
  const data = await response.json();
  if (data.erro) throw new CepNotFoundError('CEP não encontrado');
  return {
    cep: formatCep(digits),
    street: data.logradouro ?? '',
    district: data.bairro ?? '',
    city: data.localidade ?? '',
    state: data.uf ?? '',
  };
}
