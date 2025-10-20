import React from 'react';
import { useModalStore } from '/app/src/stores/modalStore';
import Modal from './Modal';
import PortfolioForm from '/app/src/modules/portfolios/modals/PortfolioForm';

const MODAL_COMPONENTS = {
  PORTFOLIO_FORM: PortfolioForm,
  // WALLET_FORM: WalletForm,
  // TRANSACTION_FORM: TransactionForm,
};

const ModalManager = () => {
  const { isOpen, modalType, modalProps } = useModalStore();

  if (!isOpen || !modalType) return null;

  const ModalContent = MODAL_COMPONENTS[modalType];
  if (!ModalContent) return null;

  return (
    <Modal size={modalProps.size}>
      <ModalContent />
    </Modal>
  );
};

export default ModalManager;
