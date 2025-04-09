export const getIsoDate = (date: string) => {
  if (!date) return undefined;
  return new Date(date).toISOString().split('T')[0];
};

export const formatDate = (date: string) => {
  if (!date) return null;

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  return new Intl.DateTimeFormat('ru', options).format(new Date(date));
};
