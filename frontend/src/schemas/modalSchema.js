import * as Yup from 'yup';

const modalSchema = (t, channels) => Yup.object().shape({
  name: Yup.string()
    .min(3, (t('ru.errorsTexts.errorValidateMax20Min3')))
    .max(20, (t('ru.errorsTexts.errorValidateMax20Min3')))
    .required((t('ru.errorsTexts.errorValidateRequiredField')))
    .test('is-unique', (t('ru.errorsTexts.errorValidateUniquePasswords')), async (value) => !channels.some((channel) => channel.name === value)),
});

export default modalSchema;
