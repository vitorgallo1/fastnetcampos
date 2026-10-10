"""
Gera src/sections/coverage-map/geo.ts a partir da malha municipal do RJ (IBGE),
distribuída em GeoJSON pelo projeto geodata-br:
https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-33-mun.json

Uso: python3 scripts/gerar-mapa.py caminho/geojs-33-mun.json
"""
import json
import math
import sys

# Recorte do mapa (graus) e municípios atendidos.
LON_MIN, LON_MAX = -41.96, -40.84
LAT_MIN, LAT_MAX = -22.20, -21.16
SERVED = {'Campos dos Goytacazes', 'São João da Barra'}
WIDTH = 600  # px do viewBox; a altura sai da proporção
TOLERANCE = 0.9  # simplificação (px) dos municípios atendidos
TOLERANCE_NEIGHBOR = 1.6  # vizinhos aparecem só como contexto
CLIP = (30, 30, WIDTH + 10, None)  # retângulo de recorte (px); None = altura do mapa + 10

LAT0 = (LAT_MIN + LAT_MAX) / 2
KX = math.cos(math.radians(LAT0))
SCALE = WIDTH / ((LON_MAX - LON_MIN) * KX)
HEIGHT = round((LAT_MAX - LAT_MIN) * SCALE)


def project(lon, lat):
    return ((lon - LON_MIN) * KX * SCALE, (LAT_MAX - lat) * SCALE)


def simplify(points, tol):
    """Douglas-Peucker."""
    if len(points) < 3:
        return points
    (x1, y1), (x2, y2) = points[0], points[-1]
    dx, dy = x2 - x1, y2 - y1
    norm = math.hypot(dx, dy) or 1e-9
    idx, dmax = 0, 0.0
    for i in range(1, len(points) - 1):
        px, py = points[i]
        dist = abs(dy * px - dx * py + x2 * y1 - y2 * x1) / norm
        if dist > dmax:
            idx, dmax = i, dist
    if dmax > tol:
        return simplify(points[: idx + 1], tol)[:-1] + simplify(points[idx:], tol)
    return [points[0], points[-1]]


def simplify_ring(points, tol):
    """Anel fechado: divide no ponto mais distante do início e simplifica as metades."""
    if points[0] == points[-1]:
        points = points[:-1]
    if len(points) < 4:
        return points
    x0, y0 = points[0]
    far = max(range(len(points)), key=lambda i: math.hypot(points[i][0] - x0, points[i][1] - y0))
    first = simplify(points[: far + 1], tol)
    second = simplify(points[far:] + [points[0]], tol)
    return first[:-1] + second[:-1]


def clip_ring(points, xmin, ymin, xmax, ymax):
    """Sutherland-Hodgman: recorta o polígono no retângulo visível."""
    def edge(pts, inside, cut):
        out = []
        for i, cur in enumerate(pts):
            prev = pts[i - 1]
            if inside(cur):
                if not inside(prev):
                    out.append(cut(prev, cur))
                out.append(cur)
            elif inside(prev):
                out.append(cut(prev, cur))
        return out

    def at_x(x):
        return lambda a, b: (x, a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]))

    def at_y(y):
        return lambda a, b: (a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]), y)

    for inside, cut in (
        (lambda p: p[0] >= xmin, at_x(xmin)),
        (lambda p: p[0] <= xmax, at_x(xmax)),
        (lambda p: p[1] >= ymin, at_y(ymin)),
        (lambda p: p[1] <= ymax, at_y(ymax)),
    ):
        if not points:
            break
        points = edge(points, inside, cut)
    return points


def ring_path(ring, tol):
    xmin, ymin, xmax, ymax = CLIP
    projected = clip_ring([project(lon, lat) for lon, lat in ring], xmin, ymin, xmax, ymax or HEIGHT + 10)
    if len(projected) < 3:
        return ''
    pts = simplify_ring(projected + [projected[0]], tol)
    if len(pts) < 3:
        return ''
    return 'M' + 'L'.join(f'{x:.1f},{y:.1f}' for x, y in pts) + 'Z'


def centroid(geometry):
    """Centroide (ponderado por área) do maior anel, em px."""
    best, best_area = None, 0.0
    for ring in rings(geometry):
        pts = [project(lon, lat) for lon, lat in ring]
        a = cx = cy = 0.0
        for (x1, y1), (x2, y2) in zip(pts, pts[1:] + pts[:1]):
            cross = x1 * y2 - x2 * y1
            a += cross
            cx += (x1 + x2) * cross
            cy += (y1 + y2) * cross
        if abs(a) > best_area:
            best_area, best = abs(a), (cx / (3 * a), cy / (3 * a))
    return best


def rings(geometry):
    if geometry['type'] == 'Polygon':
        return geometry['coordinates']
    return [r for poly in geometry['coordinates'] for r in poly]


def intersects(geometry):
    pts = [p for r in rings(geometry) for p in r]
    xs, ys = [p[0] for p in pts], [p[1] for p in pts]
    return max(xs) > LON_MIN and min(xs) < LON_MAX and max(ys) > LAT_MIN and min(ys) < LAT_MAX


def main(src):
    data = json.load(open(src, encoding='utf-8'))
    shapes = []
    for feature in data['features']:
        if not intersects(feature['geometry']):
            continue
        name = feature['properties']['name']
        tol = TOLERANCE if name in SERVED else TOLERANCE_NEIGHBOR
        d = ''.join(ring_path(r, tol) for r in rings(feature['geometry']))
        if not d:
            continue
        cx, cy = centroid(feature['geometry'])
        shapes.append({'name': name, 'served': name in SERVED, 'd': d, 'cx': cx, 'cy': cy})
    shapes.sort(key=lambda s: s['served'])  # atendidos por cima

    out = [
        '// Arquivo gerado por scripts/gerar-mapa.py — não edite à mão.',
        '// Fonte: malha municipal do IBGE (RJ), via geodata-br.',
        '',
        f'export const MAP_WIDTH = {WIDTH};',
        f'export const MAP_HEIGHT = {HEIGHT};',
        '',
        '/** Converte longitude/latitude em coordenadas do viewBox. */',
        'export function project(lon: number, lat: number): [number, number] {',
        f'  return [(lon - ({LON_MIN})) * {KX * SCALE:.4f}, ({LAT_MAX} - lat) * {SCALE:.4f}];',
        '}',
        '',
        'export type Municipality = { name: string; served: boolean; d: string; cx: number; cy: number };',
        '',
        'export const municipalities: Municipality[] = [',
    ]
    for s in shapes:
        out.append(
            f"  {{ name: {json.dumps(s['name'], ensure_ascii=False)}, served: {str(s['served']).lower()}, "
            f"cx: {s['cx']:.0f}, cy: {s['cy']:.0f}, d: '{s['d']}' }},"
        )
    out.append('];')
    out.append('')
    sys.stdout.write('\n'.join(out))


if __name__ == '__main__':
    main(sys.argv[1])
