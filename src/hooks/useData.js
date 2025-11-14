import { useState } from 'react';
import { useDataStore } from '/app/src/stores/dataStore';

// Хуки для получения портфелей
export const usePortfolio = (portfolioId) => {
  return useDataStore(state => state.getPortfolio(portfolioId));
};

// Хуки для получения кошельков
export const useWallet = (walletId) => {
  return useDataStore(state => state.getWallet(walletId));
};
