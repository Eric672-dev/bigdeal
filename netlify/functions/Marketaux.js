// Relais serveur pour l'API Marketaux (actualités par valeur).
// Même principe que eodhd.js : le navigateur n'appelle jamais api.marketaux.com
// directement, la clé API reste secrète côté serveur.
//
// Configuration requise sur Netlify : Site configuration → Environment variables →
// ajouter MARKETAUX_API_KEY avec ta clé API Marketaux (tableau de bord marketaux.com).

exports.handler = async (event) => {
  const cors = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' };

  const apiKey = process.env.MARKETAUX_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: cors,
      body: JSON.stringify({ message: "MARKETAUX_API_KEY n'est pas configurée sur ce site Netlify (Site configuration → Environment variables)." })
    };
  }

  const params = event.queryStringParameters || {};
  const forwarded = new URLSearchParams();
  Object.keys(params).forEach((k) => { forwarded.set(k, params[k]); });
  forwarded.set('api_token', apiKey);

  const url = `https://api.marketaux.com/v1/news/all?${forwarded.toString()}`;

  try {
    const upstream = await fetch(url);
    const text = await upstream.text();
    return { statusCode: upstream.status, headers: cors, body: text };
  } catch (e) {
    return { statusCode: 502, headers: cors, body: JSON.stringify({ message: 'Erreur relais vers Marketaux : ' + ((e && e.message) || e) }) };
  }
};
