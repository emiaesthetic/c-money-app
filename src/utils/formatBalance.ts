export const formatBalance = (balance: number) => {
  if (typeof balance !== 'number') return null;

  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'RUB',
  };

  return new Intl.NumberFormat('ru', options).format(balance);
};
