export const errors = {
  // 400
  BAD_REQUEST_USER_REGISTERED: {
    message: 'Пользователь с такими данными уже существует',
    code: 'USER_IS_ALREADY_REGISTERED',
  },
  BAD_REQUEST_NO_TOKEN: {
    message: 'Неверный токен',
  },
  EMAIL_ALREADY_USED_ERROR: {
    message: 'Пользователь с такими данными уже существует',
    code: 'REPEAT_VALUES',
  },
  USER_ALREADY_EXIST: {
    message: 'Пользователь с такими данными уже существует',
    code: 'USER_ALREADY_EXIST',
  },
  PASSWORD_IS_NOT_EQUAL: {
    message: 'Неправильное имя пользователя или пароль',
    code: 'PASSWORD_IS_NOT_EQUAL',
  },
  CANT_ADD_FEED_YOURSELF: {
    message: 'Нельзя добавить отзыв себе',
    code: 'CANT_ADD_FEED_YOURSELF',
  },
  MUST_BE_CUSTOMER: {
    message: 'Пользователь должен быть заказчиком',
    code: 'MUST_BE_CUSTOMER',
  },
  ORDER_NOT_YOUR: {
    message: 'Этот заказ не ваш',
    code: 'ORDER_NOT_YOUR',
  },
  USER_BLOCKED: {
    message: 'Пользователь заблокирован',
    code: 'USER_BLOCKED',
  },
  ADMIN_CODE_NOT_EQUAL: {
    message: 'Неверный код',
    code: 'ADMIN_CODE_NOT_EQUAL',
  },

  //401
  UNAUTHORIZED_BAD_TOKEN: {
    message: 'Неверный токен',
  },

  //404
  USER_NOT_FOUND: {
    message: 'Пользователь не найден',
    code: 'USER_NOT_FOUND',
  },
  ORDER_NOT_FOUNT: {
    message: 'Не найден',
    code: 'ORDER_NOT_FOUNT',
  },
  ADMIN_EMAIL_NOT_FOUND: {
    message: 'Админ с такой электронной почтой не найден',
    code: 'ADMIN_EMAIL_NOT_FOUND',
  },
  EMAIL_NOT_FOUND: {
    message: 'Электронная почта не найдена',
    code: 'EMAIL_NOT_FOUND',
  },
  INVALID_TOKEN: {
    message: 'Неверный токен',
    code: 'INVALID_TOKEN',
  },
  INJURED_TOKEN: {
    message: 'Токен истёк',
    code: 'INJURED_TOKEN',
  },
  VALIDATION_ERROR: {
    message: 'Ошибка проверки',
    code: 'VALIDATION_ERROR',
  },
  INVALID_PASSWORD: {
    message: 'Неправильное имя пользователя или пароль',
    code: 'INVALID_PASSWORD',
  },
}
