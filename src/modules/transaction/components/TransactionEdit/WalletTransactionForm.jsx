import React from 'react';
import { Form, message } from 'antd';
import { WALLET_TYPES } from '/app/src/modules/transaction/constants/transactionTypes';
import { useTransactionForm } from './hooks/useTransactionForm';
import { useTransactionData } from './hooks/useTransactionData';
import { useWalletOperations } from '/app/src/modules/wallets/hooks/useWalletOperations';
import FormComment from '/app/src/features/forms/FormComment';
import FormDate from '/app/src/features/forms/FormDate';
import FormRadioGroup from '/app/src/features/forms/FormRadioGroup';
import FormActionBtns from '/app/src/features/forms/FormActionBtns';
import FormSelect from '/app/src/features/forms/FormSelect';
import FormQuantityInput from '/app/src/features/forms/FormQuantityInput';
import ShowMore from '/app/src/components/ui/ShowMore';

const WalletTransactionForm = ({ asset, walletId, transaction, onClose }) => {
  const { editTransaction, loading } = useWalletOperations();

  const availableTypes = WALLET_TYPES;

  const { form, transactionType, handleTypeChange } = useTransactionForm(transaction, availableTypes[0].value);
  const { wallets, selectedWallet } = useTransactionData({ asset, walletId, transaction, transactionType });

  const isSellType = ['Sell', 'Output', 'TransferOut'].includes(transactionType);

  const handleSubmit = async (values) => {
    const submitData = {
      ...values,
      // Добавляем ID если редактируем
      ...(transaction && { id: transaction.id }),
      assetId: asset?.id,
      tickerId: asset?.tickerId,
      walletId: walletId,
    };

    const result = await editTransaction(submitData);

    if (result.success) {
      message.success(transaction ? 'Транзакция обновлена' : 'Транзакция добавлена');
      onClose();
    } else {
      message.error(result.error || 'Произошла ошибка');
    }
  };

  const isSendingWallet = transaction === null || transaction?.walletId === walletId;

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

      {/* Кошелек */}
      <FormSelect
        name="wallet2Id"
        label={isSendingWallet ? 'Кошелек получатель' : 'Кошелек отправитель'} 
        value={selectedWallet?.id}
        rules={[{ required: true, message: 'Выберите кошелек' }]}
        options={wallets}
        fieldNames={{label: 'name', value: 'id'}}
        optionRender={(o, { index }) => (<>
          {o.data.name}
          {isSellType ? <span className='option-subtext'>({o.data.free} {asset?.symbol})</span> : null}
        </>)}
      />

      {/* Количество */}
      <FormQuantityInput
        showFree={isSendingWallet}
        walletFree={selectedWallet.free}
        ticker={asset?.symbol}
      />

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

export default WalletTransactionForm;
