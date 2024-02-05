import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import ru from './ru';

export default () => i18next
  .use(initReactI18next)
  .init({
    resources: {
      ru: {
        translation: { ru },
      },
    },
    lng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });
