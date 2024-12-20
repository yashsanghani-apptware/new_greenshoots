import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-express-middleware';

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './locales/{{lng}}/messages.json'
    }
  });

export const i18nMiddleware = middleware.handle(i18next);

export default i18next;

