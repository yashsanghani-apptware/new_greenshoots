import * as i18n from 'i18n';

i18n.configure({
    locales: ['en', 'es'],
    directory: __dirname + '/locales',
    defaultLocale: 'en',
    objectNotation: true,
    register: global
});

export default i18n;

