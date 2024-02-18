import * as Yup from 'yup';
import leoProfanity from 'leo-profanity';

const modalSchema = (t, channels) => Yup.object().shape({
  name: Yup.string()
    .min(3, t('ru.errorsTexts.errorValidateMax20Min3'))
    .max(20, t('ru.errorsTexts.errorValidateMax20Min3'))
    .required(t('ru.errorsTexts.errorValidateRequiredField'))
    .test('is-unique', t('ru.errorsTexts.errorValidateUnique'), async (value) => !channels.some((channel) => channel.name === leoProfanity.clean(value))),
});

export default modalSchema;
