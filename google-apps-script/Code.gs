/*
 * Maison Noor — Google Sheets order receiver
 *
 * 1. Open the linked Google Sheet.
 * 2. Extensions → Apps Script.
 * 3. Replace the default file with this code.
 * 4. Deploy → New deployment → Web app.
 * 5. Execute as: Me. Who has access: Anyone.
 * 6. Copy the /exec URL to VITE_ORDERS_ENDPOINT in Vercel.
 */

const SPREADSHEET_ID = '1DSYgeFsl5NJCYFwMLIJB_jCaT6lDbOAiSOkXLKWXtbw';
const SHEET_NAME = 'Commandes';

function doGet() {
  return jsonResponse({ ok: true, service: 'Maison Noor COD receiver' });
}

function doPost(event) {
  try {
    const payload = JSON.parse((event && event.postData && event.postData.contents) || '{}');
    validatePayload(payload);

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error(`Sheet “${SHEET_NAME}” introuvable.`);

    // The client always sends a unique order ID. Ignore a repeated request safely.
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues().flat();
      if (ids.includes(payload.orderId)) {
        return jsonResponse({ ok: true, duplicate: true, orderId: payload.orderId });
      }
    }

    const customer = payload.customer || {};
    const products = (payload.items || [])
      .map((item) => `${item.name} ${item.variant} ×${item.quantity}`)
      .join(' • ');

    sheet.appendRow([
      payload.orderId,
      new Date(payload.createdAt || new Date().toISOString()),
      'Nouvelle',
      customer.name || '',
      customer.phone || '',
      customer.city || '',
      customer.address || '',
      products,
      Number(payload.subtotal || 0),
      Number(payload.shipping || 0),
      Number(payload.total || 0),
      payload.paymentMethod || 'Paiement à la livraison',
      payload.source || 'Maison Noor — site web',
      payload.whatsapp || 'Lien de confirmation proposé',
      '',
    ]);

    const newRow = sheet.getLastRow();
    sheet.getRange(newRow, 2).setNumberFormat('yyyy-mm-dd hh:mm');
    sheet.getRange(newRow, 9, 1, 3).setNumberFormat('#,##0 "MAD"');

    return jsonResponse({ ok: true, orderId: payload.orderId, row: newRow });
  } catch (error) {
    return jsonResponse({ ok: false, error: error.message || String(error) });
  }
}

function validatePayload(payload) {
  if (!payload.orderId) throw new Error('orderId manquant.');
  if (!payload.customer || !payload.customer.name || !payload.customer.phone) {
    throw new Error('Informations client incomplètes.');
  }
  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    throw new Error('Aucun article dans la commande.');
  }
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
