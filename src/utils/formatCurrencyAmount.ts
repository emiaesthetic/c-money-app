export const formatCurrencyAmount = (value: number): string => {
  const formatted = new Intl.NumberFormat('en-US', {
    useGrouping: true,
  }).format(value);

  return formatted.replace(/,/g, ' ');
};
