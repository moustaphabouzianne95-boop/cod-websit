# Maison Noor — boutique COD de parfums

Boutique React / Vite pensée pour les commandes de parfums avec paiement à la livraison au Maroc.

## Lancer en local

```bash
npm install
npm run dev
```

Ouvrez l’URL affichée par Vite.

## Construire la version de production

```bash
SITE_URL=https://www.votre-domaine.ma npm run build
```

Le build est créé dans `dist/`. La commande génère aussi automatiquement :

- `robots.txt`
- `sitemap.xml`
- les métadonnées de partage social sont déjà intégrées à `index.html`
- un favicon et une image sociale locale sont inclus dans `public/`

> Sans `SITE_URL`, le projet utilise `https://maison-noor.example` comme valeur de démonstration. Ne déployez pas cette valeur telle quelle.

## Variables d’environnement

Copiez `.env.example` dans `.env.production` puis renseignez vos valeurs :

```bash
SITE_URL=https://www.votre-domaine.ma
VITE_CONTACT_PHONE=+212600000000
VITE_CONTACT_PHONE_DISPLAY=+212 6 00 00 00 00
```

`SITE_URL` sert au sitemap et à `robots.txt`. Les variables `VITE_` sont injectées dans l’interface au moment du build.

## Déploiement rapide

### Netlify

1. Importez ce dépôt dans Netlify.
2. Configurez `npm run build` comme **Build command** et `dist` comme **Publish directory**.
3. Ajoutez la variable d’environnement `SITE_URL` avec votre domaine final.
4. Associez votre domaine personnalisé dans **Domain management** puis relancez le build.

`netlify.toml` et `public/_redirects` sont déjà prêts.

### Vercel

1. Importez le dépôt dans Vercel.
2. Vercel détecte Vite : utilisez `npm run build` et `dist` si les valeurs ne sont pas préremplies.
3. Ajoutez `SITE_URL` dans **Project settings → Environment variables**.
4. Ajoutez votre domaine et redéployez.

`vercel.json` contient les règles SPA et des en-têtes de sécurité de base.

## Checklist avant d’ouvrir les ventes

- [ ] Remplacer le téléphone fictif par votre numéro WhatsApp / SAV réel.
- [ ] Remplacer les noms, visuels, notes, prix et stocks des produits par vos données exactes.
- [ ] Connecter le formulaire COD à WhatsApp, e-mail, Google Sheets ou votre API : à ce stade, la confirmation reste une démonstration front-end.
- [ ] Définir `SITE_URL` sur le domaine final et refaire un build.
- [ ] Vérifier le site sur mobile, soumettre `https://votre-domaine.ma/sitemap.xml` dans Google Search Console et installer votre pixel publicitaire si besoin.

## Scripts

| Commande | Usage |
| --- | --- |
| `npm run dev` | Lance le site localement. |
| `npm run generate:seo` | Génère `robots.txt` et `sitemap.xml`. |
| `npm run build` | Génère la version de production dans `dist/`. |
| `npm run preview` | Prévisualise le build de production. |

## Réception COD : Google Sheets + WhatsApp

Le tableur opérationnel est créé avec l’onglet **Commandes** et les colonnes de suivi COD. Le code de réception Google Apps Script se trouve dans [`google-apps-script/Code.gs`](google-apps-script/Code.gs).

1. Publiez ce script comme **Application Web** depuis le tableur, suivant les instructions dans [`google-apps-script/README.md`](google-apps-script/README.md).
2. Ajoutez l’URL `/exec` obtenue à la variable Vercel `VITE_ORDERS_ENDPOINT`.
3. Relancez un déploiement Vercel.

Le checkout ouvre aussi une confirmation WhatsApp préremplie vers le numéro configuré par `VITE_WHATSAPP_NUMBER`.
