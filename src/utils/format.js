export const formatCurrency = (number, currency = 'USD', locale = 'ru-RU') => {
  number = Number(number);
  if (isNaN(number)) return;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0
  }).format(number);
};

export const formatPercentage = (value, decimals = 0) => {
    return `${Math.abs(value.toFixed(decimals))}%`;
  };

export const formatNumber = (number, options = {}) => {
  return new Intl.NumberFormat('ru-RU', options).format(number);
};
