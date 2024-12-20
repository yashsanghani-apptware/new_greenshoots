import i18n from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import path from 'path';

/**
 * Initializes i18next with filesystem backend and HTTP middleware.
 * Configures i18next to load translations from the 'locales' directory.
 * The middleware detects the language of incoming requests.
 */
i18n
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
        fallbackLng: 'en',
        backend: {
            loadPath: path.join(__dirname, '../../locales/{{lng}}/translation.json')
        }
    });

/**
 * Export the i18n middleware for integration with Express.js applications.
 * This middleware will handle language detection and translation.
 */

export default i18n; // Export the i18next instance
export const i18nMiddleware = middleware.handle(i18n);

