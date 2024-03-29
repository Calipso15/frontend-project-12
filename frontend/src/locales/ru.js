const ru = {
  header: {
    heading: 'Hexlet Chat',
    logOut: 'Выйти',
  },
  chat: {
    counter: {
      count_zero: '{{count}} сообщений',
      count_one: '{{count}} сообщение',
      count_few: '{{count}} сообщения',
      count_many: '{{count}} сообщений',
    },
    channel: 'Каналы',
    addChannelModalHeading: 'Добавить канал',
    inputNameChannel: 'Имя канала',
    addBtn: 'Отправить',
    cancelBtn: 'Отменить',
    deleteChannelModalHeading: 'Удалить канал',
    deleteChannelModalText: 'Вы уверены?',
    deleteChannelBtn: 'Удалить',
    renameChannelModalHeading: 'Переименовать канал',
    renameChannelBtn: 'Переименовать',
    dropdownListSwitch: 'Управление каналом',
  },
  messages: {
    newMessage: 'Новое сообщение',
    placeholderMessage: 'Введите сообщение...',
  },
  authorization: {
    header: 'Авторизация',
    login: 'Ваш ник',
    password: 'Пароль',
    signInBtn: 'Войти',
    signInBtnLoadingData: 'Загрузка ....',
  },
  registration: {
    header: 'Регистрация',
    name: 'Имя пользователя',
    password: 'Пароль',
    confirmPassword: 'Подтвердите пароль',
    signUpBtn: 'Зарегистрироваться',
  },
  errorsTexts: {
    errorNamePasswordMessage: 'Неверные имя пользователя или пароль',
    errorPasswordMessage: '',
    errorValidateRequiredField: 'Oбязательное поле',
    errorValidateMax20Min3: 'От 3 до 20 символов',
    errorValidateMin5: 'Oт 5 символов',
    errorValidateMin6: 'Не менее 6 символов',
    errorValidateSamePasswords: 'Пароли должны совпадать',
    errorValidateUserAlreadyExist: 'Такой пользователь уже существует',
    errorValidateUnique: 'Должно быть уникальным',
  },
  notify: {
    notifyErrorErrorNetwork: 'Ошибка соединения',
    unknown: 'Неизвестная ошибка',
    notifyDeletChannel: 'Канал удалён',
    notifyChangeChannel: 'Канал переименован',
    notifyCreateChannel: 'Канал создан',
  },
  footer: {
    authorization: 'Нет аккаунта?',
    authLink: 'Регистрация',
    registration: 'Уже есть аккаунт?',
    regLink: 'авторизация',
  },
  notFound: {
    header: 'Страница не найдена',
    message: 'Но вы можете перейти ',
    linkText: 'на главную страницу',
  },
};

export default ru;
