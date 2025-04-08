const ERROR_MESSAGES: Record<string, string> = {
  'Invalid password': 'Неверный пароль',
  'No such user': 'Пользователь не найден',
  'Network Error': 'Ошибка соединения',
  default: 'Произошла ошибка. Пожалуйста, попробуйте позже',
};

export const getErrorMessage = (errorKey: string): string => {
  return ERROR_MESSAGES[errorKey] || ERROR_MESSAGES.default;
};
