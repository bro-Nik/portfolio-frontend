export const formatCurrency = (number, currency = 'USD', locale = 'ru-RU') => {
  number = Number(number);
  if (isNaN(number)) return;

  // Проверяем, является ли валюта валидной ISO 4217
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(number);
    
  } catch (error) {
    // Если валюта не ISO 4217, просто выводим число и переданную валюту
    const formattedNumber = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
    }).format(number);
    
    return `${formattedNumber} ${currency.toUpperCase()}`;
  }
};

export const formatPercentage = (value, decimals = 0) => {
    return `${Math.abs(value.toFixed(decimals))}%`;
  };

export const formatNumber = (number, options = {}) => {
  return new Intl.NumberFormat('ru-RU', options).format(number);
};
