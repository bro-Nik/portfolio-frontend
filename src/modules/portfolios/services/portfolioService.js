export const portfolioService = {
  validateEdit(portfolio) {
    return { isValid: true };
  },

  validateDelete(portfolio) {
    // if (portfolio.itemsCount > 0) {
    //   return { isValid: false, error: 'Портфель не пустой' };
    // }
    // if (!user.canDelete) {
    //   return { isValid: false, error: 'Нет прав на удаление' };
    // }
    return { isValid: true };
  },
  
};
