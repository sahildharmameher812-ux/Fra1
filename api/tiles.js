// Vercel Serverless Tile Proxy - serves map tiles as same-origin to bypass CSP
// Usage:
//  /api/tiles/osm/{z}/{x}/{y}.png
//  /api/tiles/opentopo/{z}/{x}/{y}.png
//  /api/tiles/esri/{z}/{x}/{y}.jpg
//  /api/tiles/google/s/{z}/{x}/{y}.png  -> satellite
//  /api/tiles/google/y/{z}/{x}/{y}.png  -> hybrid (labels)

const SUBS = ['a', 'b', 'c'];

module.exports = async (req, res) => {
  try {
    // Example paths:
    // /api/tiles/osm/7/91/55.png
    // /api/tiles/google/s/7/91/55.png
    const match = req.url.match(/\/api\/tiles\/(osm|opentopo|esri|google)(?:\/([sy]))?\/(\d+)\/(\d+)\/(\d+)\.(?:png|jpg|jpeg)/i);
    if (!match) {
      res.statusCode = 400;
      return res.end('Bad tile request');
    }

    const [, provider, googleLayer, z, x, y] = match;

    let upstream;
    switch (provider) {
      case 'osm': {
        const s = SUBS[Math.floor(Math.random() * SUBS.length)];
        upstream = `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`;
        break;
      }
      case 'opentopo': {
        const s = SUBS[Math.floor(Math.random() * SUBS.length)];
        upstream = `https://${s}.tile.opentopomap.org/${z}/${x}/${y}.png`;
        break;
      }
      case 'esri': {
        // Note: Esri expects /{z}/{y}/{x}
        upstream = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`;
        break;
      }
      case 'google': {
        // googleLayer: 's' (satellite) or 'y' (hybrid)
        const lyrs = googleLayer === 'y' ? 'y' : 's';
        upstream = `https://mt1.google.com/vt/lyrs=${lyrs}&z=${z}&x=${x}&y=${y}`;
        break;
      }
      default:
        res.statusCode = 400; return res.end('Unknown provider');
    }

    const upstreamRes = await fetch(upstream, { headers: { 'User-Agent': 'FRA-Atlas/1.0' } });
    if (!upstreamRes.ok) {
      res.statusCode = upstreamRes.status;
      return res.end(`Upstream error: ${upstreamRes.status}`);
    }

    // Set caching and content type
    const ct = upstreamRes.headers.get('content-type') || 'image/png';
    res.setHeader('Content-Type', ct);
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const buf = Buffer.from(await upstreamRes.arrayBuffer());
    res.statusCode = 200;
    return res.end(buf);
  } catch (err) {
    res.statusCode = 500;
    return res.end('Tile proxy error');
  }
};
