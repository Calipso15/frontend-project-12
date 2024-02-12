import * as Yup from 'yup';

const signupSchema = (t) => Yup.object().shape({
  username: Yup.string()
    .min(3, t('ru.errorsTexts.errorValidateMax20Min3'))
    .max(20, t('ru.errorsTexts.errorValidateMax20Min3'))
    .required(t('ru.errorsTexts.errorValidateRequiredField')),
  password: Yup.string()
    .min(6, t('ru.errorsTexts.errorValidateMin6'))
    .required(t('ru.errorsTexts.errorValidateRequiredField')),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], t('ru.errorsTexts.errorValidateSamePasswords'))
    .required(t('ru.errorsTexts.errorValidateRequiredField')),
});

export default signupSchema;
