export const errors = {
  // 400
  BAD_REQUEST_USER_REGISTERED: {
    message: 'User is already registered',
    code: 'USER_IS_ALREADY_REGISTERED',
  },
  BAD_REQUEST_NO_TOKEN: {
    message: 'Token is not present',
  },
  EMAIL_ALREADY_USED_ERROR: {
    message: 'User with such email registered',
    code: 'REPEAT_VALUES',
  },
  USER_ALREADY_EXIST: {
    message: 'User already exist',
    code: 'USER_ALREADY_EXIST',
  },
  PASSWORD_IS_NOT_EQUAL: {
    message: 'Password is not equal',
    code: 'PASSWORD_IS_NOT_EQUAL',
  },
  CANT_ADD_FEED_YOURSELF: {
    message: "Can't add feedback to yourself",
    code: 'CANT_ADD_FEED_YOURSELF',
  },
  MUST_BE_CUSTOMER: {
    message: 'User must be a customer',
    code: 'MUST_BE_CUSTOMER',
  },
  ORDER_NOT_YOUR: {
    message: 'This order is not your',
    code: 'ORDER_NOT_YOUR',
  },
  USER_BLOCKED: {
    message: 'This user is blocked',
    code: 'USER_BLOCKED',
  },

  //401
  UNAUTHORIZED_BAD_TOKEN: {
    message: 'Something wrong with token',
  },

  //404
  USER_NOT_FOUND: {
    message: 'User not found',
    code: 'USER_NOT_FOUND',
  },
  ORDER_NOT_FOUNT: {
    message: 'Order not found',
    code: 'ORDER_NOT_FOUNT',
  },
  ADMIN_EMAIL_NOT_FOUND: {
    message: 'Admin with such email not found',
    code: 'ADMIN_EMAIL_NOT_FOUND',
  },
  EMAIL_NOT_FOUND: {
    message: 'Email not found',
    code: 'EMAIL_NOT_FOUND',
  },
  INVALID_TOKEN: {
    message: 'Invalid token',
    code: 'INVALID_TOKEN',
  },
  INJURED_TOKEN: {
    message: 'Injured token',
    code: 'INJURED_TOKEN',
  },
  VALIDATION_ERROR: {
    message: 'Validation error',
    code: 'VALIDATION_ERROR',
  },
  INVALID_PASSWORD: {
    message: 'Invalid password',
    code: 'INVALID_PASSWORD',
  },
}
