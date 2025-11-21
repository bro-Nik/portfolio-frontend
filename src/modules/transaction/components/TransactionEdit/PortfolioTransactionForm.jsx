import React, { useEffect } from 'react';
import { Form, Input, Button, message, InputNumber } from 'antd';
import { useTransactionCalculations } from './hooks/useTransactionCalculations';
import { PORTFOLIO_TYPES } from '/app/src/modules/transaction/constants/transactionTypes';
import { useTransactionForm } from './hooks/useTransactionForm';
import { useTransactionData } from './hooks/useTransactionData';
import { useTransactionOperations } from '/app/src/modules/transaction/hooks/useTransactionOperations';
import FormComment from '/app/src/features/forms/FormComment';
import FormDate from '/app/src/features/forms/FormDate';
import FormRadioGroup from '/app/src/features/forms/FormRadioGroup';
import FormCheckbox from '/app/src/features/forms/FormCheckbox';
import FormSelect from '/app/src/features/forms/FormSelect';
import FormActionBtns from '/app/src/features/forms/FormActionBtns';
import FormQuantityInput from '/app/src/features/forms/FormQuantityInput';
import ShowMore from '/app/src/components/ui/ShowMore';

const PortfolioTransactionForm = ({ asset, portfolioId, transaction, onClose }) => {
  const { editTransaction, loading } = useTransactionOperations();

  const availableTypes = PORTFOLIO_TYPES;

  const { 
    form,
    transactionType, handleTypeChange,
    calculationType, toggleCalculationType, 
  } = useTransactionForm(transaction, availableTypes[0].value);

  const { handleQuantityChange, handleAmountChange, handlePriceChange } = useTransactionCalculations(form, calculationType);
  const {
    portfolios,
    wallets, handleWalletChange, selectedWallet,
    selectedTicker, handleTickerChange,
  } = useTransactionData({ asset, portfolioId, transaction, transactionType });

  const isSellType = ['Sell', 'Output', 'TransferOut'].includes(transactionType);
  const showOrderSection = ['Buy', 'Sell'].includes(transactionType);
  const showWalletSection = ['Buy', 'Input', 'Earning', 'Sell', 'Output', 'TransferIn'].includes(transactionType);
  const showPortfolioSection = ['TransferIn', 'TransferOut'].includes(transactionType);
  const showPriceSection = ['Buy', 'Sell'].includes(transactionType);
  const showAmountField = ['Buy', 'Sell'].includes(transactionType);

  useEffect(() => {
    const price = selectedTicker?.price !== 0 ? asset.price / selectedTicker?.price : 0;
    form.setFieldValue('price', price || '');
  }, [asset.price, selectedTicker?.price, form]);

  const handleSubmit = async (values) => {
    const submitData = {
      ...values,
      // Добавляем ID если редактируем
      ...(transaction && { id: transaction.id }),
      assetId: asset?.id,
      tickerId: asset?.tickerId,
      priceUsd: form.getFieldValue('price') * selectedTicker?.price,
      portfolioId: portfolioId,
    };

    const result = await editTransaction(transaction, submitData);

    if (result.success) {
      message.success(transaction ? 'Транзакция обновлена' : 'Транзакция добавлена');
      onClose();
    } else {
      message.error(result.error || 'Произошла ошибка');
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      requiredMark="optional"
      size="middle"
    >
      {/* Тип транзакции */}
      <FormRadioGroup name='type' btns={availableTypes} onChange={handleTypeChange}/>

      {/* Ордер */}
      {showOrderSection && <FormCheckbox name="order" label="Ордер" checked={transaction?.order} />}

      {/* Кошелек */}
      {showWalletSection && (
        <FormSelect
          name="walletId"
          label='Кошелек' 
          value={selectedWallet?.id}
          rules={[{ required: true, message: 'Выберите кошелек' }]}
          onChange={handleWalletChange}
          fieldNames={{label: 'name', value: 'id'}}
          options={wallets}
          optionRender={(o, { index }) => (<>
            {o.data.name}
            {o.data.free !== undefined ? <span className='option-subtext'>({o.data.free} {asset.symbol})</span> : null}
          </>)}
        />
      )}

      {/* Портфель (для переводов) */}
      {showPortfolioSection && (
        <FormSelect
          name="portfolio2Id"
          label="Портфель" 
          value={transaction?.portfolio2Id}
          rules={[{ required: true, message: 'Выберите портфель' }]}
          fieldNames={{label: 'name', value: 'id'}}
          options={portfolios}
          optionRender={(o, { index }) => (<>
            {o.data.name}
            <span className='option-subtext'>({o.data.free} {asset.symbol})</span>
          </>)}
        />
      )}

      {/* Цена */}
      {showPriceSection && (
        <Form.Item label="Цена">
          <Input.Group compact>
            <FormSelect
              name="ticker2Id"
              noStyle
              initialValue={selectedTicker?.id}
              rules={[{ required: true, message: 'Выберите валюту' }]}
              showSearch
              popupMatchSelectWidth={false}
              placeholder="Валюта"
              addonBefore={selectedTicker?.symbol || '—'}
              onChange={handleTickerChange}
              disabled={!selectedWallet?.assets?.length}
              fieldNames={{label: 'symbol', value: 'tickerId'}}
              options={selectedWallet?.assets}
              optionRender={(o, { index }) => (<>
                {o.data.symbol}
                {o.data.free !== undefined ? <span className='option-subtext'>({o.data.free} доступно)</span> : null}
              </>)}
            />
            <Form.Item 
              name="price"
              noStyle
              rules={[{ required: true, message: 'Введите цену' }]}
            >
              <InputNumber
                placeholder="0.00"
                onChange={handlePriceChange}
                step="0.01"
                min="0"
                precision={2}
                disabled={!selectedWallet}
              />
            </Form.Item>
          </Input.Group>
        </Form.Item>
      )}

      {/* Количество */}
      <FormQuantityInput
        showFree={isSellType}
        walletFree={selectedWallet?.free}
        portfolioFree={asset?.free || 0}
        ticker={asset.symbol}
        onChange={handleQuantityChange}
        disabled={calculationType !== 'quantity' && showAmountField}
      />

      {/* Сумма транзакции */}
      {showAmountField && (
        <Form.Item
          label={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              Сумма транзакции
              <Button type="link" onClick={toggleCalculationType} >↕</Button>
            </div>
          }
          name="quantity2"
          rules={[{ required: true, message: 'Введите сумму' }]}
        >
          <InputNumber
            addonBefore={selectedTicker?.symbol || '—'}
            placeholder="0.00"
            step="0.01"
            min="0.01"
            precision={2}
            style={{ width: '100%' }}
            disabled={calculationType !== 'amount'}
            onChange={handleAmountChange}
          />
        </Form.Item>
      )}

      {/* Дата */}
      <FormDate />

      {/* Кнопка "Еще" */}
      <ShowMore content={<FormComment />}/>

      {/* Кнопки действий */}
      <FormActionBtns
        title={transaction ? 'Сохранить' : 'Добавить'} 
        onCancel={handleCancel}
        disabled={isSellType && asset?.free <= 0}
        loading={loading}
      />
    </Form>
  );
};

export default PortfolioTransactionForm;
