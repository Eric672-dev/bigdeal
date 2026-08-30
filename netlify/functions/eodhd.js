// Relais serveur pour l'API EODHD.
// Le navigateur n'appelle jamais eodhd.com directement (bloqué par EODHD via CORS,
// et la clé API ne doit jamais être exposée côté client). Il appelle cette fonction,
// hébergée sur le même site, qui ajoute la clé secrète et transmet la requête.
//
// Configuration requise sur Netlify : Site configuration → Environment variables →
// ajouter EODHD_API_KEY avec ta clé API EODHD.

exports.handler = async (event) => {
  const cors = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' };

  const apiKey = process.env.EODHD_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: cors,
      body: JSON.stringify({ message: "EODHD_API_KEY n'est pas configurée sur ce site Netlify (Site configuration → Environment variables)." })
    };
  }

  const params = event.queryStringParameters || {};
  const path = params.path;
  if (!path || !path.startsWith('/')) {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ message: "Paramètre 'path' manquant ou invalide." }) };
  }

  const forwarded = new URLSearchParams();
  Object.keys(params).forEach((k) => {
    if (k === 'path') return;
    forwarded.set(k, params[k]);
  });
  forwarded.set('api_token', apiKey);
  forwarded.set('fmt', 'json');

  const url = `https://eodhd.com/api${path}?${forwarded.toString()}`;

  try {
    const upstream = await fetch(url);
    const text = await upstream.text();
    return { statusCode: upstream.status, headers: cors, body: text };
  } catch (e) {
    return { statusCode: 502, headers: cors, body: JSON.stringify({ message: 'Erreur relais vers EODHD : ' + ((e && e.message) || e) }) };
  }
};
