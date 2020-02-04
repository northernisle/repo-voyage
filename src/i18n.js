import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './i18n/index';

const availableLanguages = Object.keys(resources);
const browserLanguages = [
  ...new Set(
    navigator.languages.map(language => language.split('-')[0].toLowerCase())
  )
];

const lng = browserLanguages.find(lang => availableLanguages.includes(lang));

i18n.use(initReactI18next).init({
  resources,
  lng,
  fallbackLng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
