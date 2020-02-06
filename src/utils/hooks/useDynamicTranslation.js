import i18next from 'i18next';
let translations = null;

const useDynamicTranslation = () => {
  const currentLanguage = i18next.language;
  if (!translations) {
    translations = require(`../../i18n/${currentLanguage}.json`).translation; 
  }

  return (translation, ...keys) => {
    if (keys.length === 0) {
      return translations[translation];
    }

    return translations[translation]?.replace(/\{(\d)\}/g, (match, index) => {
      return keys[index];
    });
  };
};

export default useDynamicTranslation;
