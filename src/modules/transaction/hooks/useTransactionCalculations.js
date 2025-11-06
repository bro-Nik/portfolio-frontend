import { useCallback } from 'react';

export const useTransactionCalculations = (form, calculationType) => {
  const handleQuantityChange = useCallback((value) => {
    const price = form.getFieldValue('price');
    if (price) {
      const calculatedAmount = (parseFloat(value) || 0) * (parseFloat(price) || 0);
      form.setFieldValue('quantity2', calculatedAmount.toFixed(2));
    }
  }, [form]);

  const handleAmountChange = useCallback((value) => {
    if (calculationType === 'amount') {
      const price = form.getFieldValue('price');
      if (price) {
        const calculatedQuantity = (parseFloat(value) || 0) / (parseFloat(price) || 1);
        form.setFieldValue('quantity', calculatedQuantity.toFixed(6));
      }
    }
  }, [form, calculationType]);

  const handlePriceChange = useCallback((value) => {
    const quantity = form.getFieldValue('quantity');
    const quantity2 = form.getFieldValue('quantity2');
    
    if (calculationType === 'quantity' && quantity) {
      const calculatedAmount = (parseFloat(quantity) || 0) * (parseFloat(value) || 0);
      form.setFieldValue('quantity2', calculatedAmount.toFixed(2));
    } else if (calculationType === 'amount' && quantity2) {
      const calculatedQuantity = (parseFloat(quantity2) || 0) / (parseFloat(value) || 1);
      form.setFieldValue('quantity', calculatedQuantity.toFixed(6));
    }
  }, [form, calculationType]);

  return {
    handleQuantityChange,
    handleAmountChange,
    handlePriceChange,
  };
};
