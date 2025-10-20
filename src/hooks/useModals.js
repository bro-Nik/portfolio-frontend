import { useModalStore } from '/app/src/stores/modalStore';

export const useModals = () => {
  const { openModal, closeModal } = useModalStore();

  return {
    openModal,
    closeModal,
    
    // Единый метод для работы с портфелями
    portfolio: {
      open: (portfolio = null, props = {}) => openModal('PORTFOLIO_FORM', { 
        portfolio,
        ...props 
      }),
    },
    
    // Для других сущностей аналогично:
    // wallet: {
    //   open: (wallet = null, props = {}) => openModal('WALLET_FORM', { 
    //     wallet,
    //     ...props 
    //   }),
    // },
  };
};
