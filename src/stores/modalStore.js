import { create } from 'zustand';

export const useModalStore = create((set, get) => ({
  isOpen: false,
  modalType: null,
  modalProps: {},
  
  openModal: (modalType, modalProps = {}) => {
    set({ 
      isOpen: true, 
      modalType, 
      modalProps 
    });
  },

  closeModal: () => {
    set({ 
      isOpen: false,
      modalType: null,
      modalProps: {}
    });
  },
}));
