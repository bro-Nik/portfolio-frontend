import React from 'react';
import { useModalStore } from '/app/src/stores/modalStore';
import { Modal } from 'antd';
import PortfolioTransactionForm from './PortfolioTransactionForm';
import WalletTransactionForm from './WalletTransactionForm';

const TransactionEdit = () => {
  const { modalProps, closeModal } = useModalStore();
  const { asset = null, portfolioId = null, walletId = null, transaction = null } = modalProps;

  const Form = portfolioId ? PortfolioTransactionForm : walletId ? WalletTransactionForm : null;

  return (
    <Modal
      open={true}
      onCancel={closeModal}
      footer={null}
      width={500}
      destroyOnClose
      centered
    >
      <Form
        asset={asset}
        walletId={walletId}
        portfolioId={portfolioId}
        transaction={transaction}
        onClose={closeModal}
      />
    </Modal>
  );
};

export default TransactionEdit;
