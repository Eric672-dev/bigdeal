# BIG DEAL — déploiement Netlify (avec relais EODHD)

## Contenu de ce dossier
- `index.html` — l'application (identique à avant, adaptée pour appeler le relais ci-dessous au lieu d'EODHD directement).
- `netlify/functions/eodhd.js` — le relais serveur qui contacte EODHD à la place du navigateur.
- `netlify.toml` — indique à Netlify où trouver la fonction.

## Étapes

### 1. Créer le dépôt GitHub
1. Va sur github.com, connecte-toi (ou crée un compte).
2. « New repository » → nomme-le par exemple `bigdeal` → « Create repository » (public ou privé, peu importe).
3. Sur la page du dépôt vide, clique « uploading an existing file ».
4. Glisse-déposer **tout le contenu de ce dossier** en conservant la structure : `index.html`, `netlify.toml`, et le dossier `netlify` avec `netlify/functions/eodhd.js` dedans (GitHub accepte de glisser un dossier entier, la structure est préservée).
5. « Commit changes ».

### 2. Connecter le dépôt à Netlify
1. Sur app.netlify.com → « Add new site » → « Import an existing project ».
2. Choisis GitHub, autorise l'accès, sélectionne le dépôt `bigdeal`.
3. Les réglages de build proposés par défaut conviennent (rien à changer — `netlify.toml` s'en charge). Clique « Deploy ».

### 3. Ajouter ta clé API EODHD
1. Sur le site créé → **Site configuration** → **Environment variables** → **Add a variable**.
2. Clé : `EODHD_API_KEY` — valeur : ta clé API (tableau de bord eodhd.com).
3. Enregistre, puis va dans **Deploys** → **Trigger deploy** → **Deploy site** (pour que la variable soit prise en compte).

### 4. Vérifier
Ouvre le site, section Préparation → Analyser une valeur → tape un nom (ex. LVMH). Si les données se chargent, tout est en place.

## Mises à jour futures
Toute modification que je fais sur `index.html` (ou `netlify/functions/eodhd.js`) devra être re-uploadée sur GitHub (bouton « Add file » → « Upload files » sur le dépôt, en remplaçant le fichier existant) — Netlify redéploie automatiquement à chaque changement du dépôt.
