const value = (key, fallback) => import.meta.env[key] || fallback;

export const site = {
  contactPhone: value('VITE_CONTACT_PHONE', '+212667788996'),
  contactPhoneDisplay: value('VITE_CONTACT_PHONE_DISPLAY', '+212 6 67 78 89 96'),
  whatsappNumber: value('VITE_WHATSAPP_NUMBER', '212667788996').replace(/\D/g, ''),
  ordersEndpoint: value('VITE_ORDERS_ENDPOINT', '').trim(),
};
