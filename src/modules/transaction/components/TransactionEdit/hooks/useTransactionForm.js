import { useState, useCallback, useEffect } from 'react';
import { Form } from 'antd';

export const useTransactionForm = (transaction, type) => {
  const [transactionType, setTransactionType] = useState(transaction?.type || type);
  const [calculationType, setCalculationType] = useState('amount');
  const [form] = Form.useForm();

  const toggleCalculationType = useCallback(() => setCalculationType(prev => prev === 'amount' ? 'quantity' : 'amount'), []);

  useEffect(() => {
    const initialValues = {
      type: transaction?.type || type,
      order: transaction?.order || false,
      date: transaction?.date ? new Date(transaction.date).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
      price: transaction?.price || '',
      quantity: transaction?.quantity ? Math.abs(transaction.quantity) : '',
      quantity2: transaction?.quantity2 ? Math.abs(transaction.quantity2) : '',
      comment: transaction?.comment || '',
      // walletId: transaction?.walletId || '',
    };

    form.setFieldsValue(initialValues);
    setTransactionType(initialValues.type);
  }, [transaction, form]);

  const handleTypeChange = useCallback((e) => {
    const type = e.target.value;
    setTransactionType(type);
    
    // Сбрасываем связанные поля при смене типа
    form.setFieldsValue({
      // portfolioId: undefined,
      walletId: undefined,
    });
  }, [form]);

  return {
    form,
    transactionType,
    calculationType,
    toggleCalculationType,
    handleTypeChange,
  };
};
