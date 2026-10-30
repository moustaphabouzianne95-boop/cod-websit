# Receiver Google Sheets — Maison Noor

Ce script reçoit les commandes du checkout, les ajoute à l’onglet **Commandes** du tableur Maison Noor, puis le site propose au client de confirmer sa commande sur WhatsApp.

## Publier le receiver

1. Ouvrez le tableur : https://docs.google.com/spreadsheets/d/1DSYgeFsl5NJCYFwMLIJB_jCaT6lDbOAiSOkXLKWXtbw/edit
2. Cliquez sur **Extensions → Apps Script**.
3. Remplacez le contenu du fichier par `Code.gs`.
4. Cliquez sur **Déployer → Nouveau déploiement → Application Web**.
5. Réglez **Exécuter en tant que : Moi** et **Qui a accès : Tout le monde**.
6. Autorisez l’accès au tableur, puis copiez l’URL qui se termine par `/exec`.
7. Envoyez-moi cette URL : je l’ajouterai dans l’environnement Vercel sous `VITE_ORDERS_ENDPOINT`, puis je relancerai le déploiement.

## Colonnes enregistrées

ID, date, statut, coordonnées client, adresse, produits, totaux MAD, paiement COD, source et état WhatsApp.

## Important

Une application Web Apps Script accessible publiquement doit être surveillée. Pour un volume important ou des besoins de sécurité renforcés, migrez ensuite le receiver vers une fonction Vercel protégée par une API et une authentification serveur.
