const value = (key, fallback) => import.meta.env[key] || fallback;

export const site = {
  contactPhone: value('VITE_CONTACT_PHONE', '+212600000000'),
  contactPhoneDisplay: value('VITE_CONTACT_PHONE_DISPLAY', '+212 6 00 00 00 00'),
};
