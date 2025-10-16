export const formatCurrency = (amount, currency = 'USD', locale = 'ru-RU') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0
  }).format(amount);
};

export const formatPercentage = (value, decimals = 0) => {
    console.log(Math.abs(value.toFixed(decimals)))
    return `${Math.abs(value.toFixed(decimals))}%`;
  };

export const formatNumber = (number, options = {}) => {
  return new Intl.NumberFormat('ru-RU', options).format(number);
};
