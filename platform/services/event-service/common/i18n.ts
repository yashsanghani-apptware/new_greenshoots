import i18n from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import Backend from 'i18next-fs-backend';

// Initialize i18next with file system backend and middleware
i18n
  .use(Backend) // Use the file system backend for loading translations
  .use(i18nextMiddleware.LanguageDetector) // Detect the language from request headers
  .init({
    backend: {
      loadPath: './locales/{{lng}}/translation.json' // Path to the translation files
    },
    fallbackLng: 'en', // Fallback language if the requested language is not available
    preload: ['en', 'es'], // Preload English and Spanish translations
    detection: {
      order: ['querystring', 'cookie'], // Order of language detection
      caches: ['cookie'] // Cache the detected language in a cookie
    }
  });

export default i18n; // Export the i18next instance
export const i18nMiddleware = i18nextMiddleware.handle(i18n); // Export the middleware for use in Express

