import * as Yup from 'yup';

const modalSchema = (t, channels) => Yup.object().shape({
  name: Yup.string()
    .min(3, t('ru.errorsTexts.errorValidateMax20Min3'))
    .max(20, t('ru.errorsTexts.errorValidateMax20Min3'))
    .required(t('ru.errorsTexts.errorValidateRequiredField'))
    .notOneOf(
      channels,
      t('ru.errorsTexts.errorValidateUnique'),
    ),
});

export default modalSchema;
