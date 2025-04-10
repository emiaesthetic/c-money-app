const ERROR_MESSAGES: Record<string, string> = {
  'Invalid password': 'Неверный пароль',
  'No such user': 'Пользователь не найден',
  'Network Error': 'Ошибка соединения',
  'Invalid account from': 'Неверно указан адрес счёта списания',
  'Invalid account to': 'Неверно указан счёт зачисления',
  'Invalid amount': 'Не указана сумма перевода',
  'Overdraft prevented': 'Недостаточно средств на счете',
  default: 'Произошла ошибка. Пожалуйста, попробуйте позже',
};

export const getErrorMessage = (errorKey: string): string => {
  return ERROR_MESSAGES[errorKey] || ERROR_MESSAGES.default;
};
