import { useState, useEffect } from 'react';
import { apiService } from '/app/src/services/api';
import { authService } from '/app/src/services/auth';

export const useWallets = (asset, transaction, transactionType) => {
  const [wallets, setWallets] = useState([]);
  const [walletAssets, setWalletAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [assetsLoading, setAssetsLoading] = useState(false);
  const [walletFreeAmount, setWalletFreeAmount] = useState(0);
  const [selectedWalletId, setSelectedWalletId] = useState(transaction?.walletId);
  const [selectedTicker, setSelectedTicker] = useState(transaction?.ticker2Id);
  const isSellType = ['Sell', 'Output', 'TransferOut'].includes(transactionType);

  const { getValidToken } = authService();
  const api = apiService('/api/wallets', getValidToken);

  // Загрузка кошельков при изменении типа транзакции
  useEffect(() => {
    const loadWallets = async () => {
      if (isSellType) await fetchWallets('sell', { tickerId: asset?.tickerId });
      else await fetchWallets('buy', { tickerId: asset?.tickerId });
    };

    if (asset) loadWallets();
    // setSelectedWalletId(null);
  }, [transactionType, asset]);

  useEffect(() => {
    if (selectedWalletId) {
      fetchWalletAssets(selectedWalletId, isSellType ? 'sell' : 'buy');
    }
    // setSelectedWalletId(null);
  }, [selectedWalletId]);


  const fetchWallets = async (type = 'buy', filters = {}) => {
    setLoading(true);
    let url = '';
    
    switch (type) {
      case 'buy':
        url = '/wallets_to_buy';
        break;
      case 'sell':
        url = `/wallets_to_sell?ticker_id=${filters.tickerId}`;
        break;
      case 'all':
        url = '/wallets';
        break;
      default:
        url = '/wallets';
    }

    const response = await api.get(url);
    
    if (response.success) setWallets(response.data);
    else setWallets([]);

    setLoading(false);
    return response;
  };

  const fetchWalletAssets = async (walletId, filter = 'buy') => {
    setAssetsLoading(true);
    const response = await api.get(`/${walletId}/assets?filter=${filter}`);
    if (response.success) setWalletAssets(response.data);
    return response.data;
  };

  // Обработчик изменения кошелька
  const handleWalletChange = async (walletId) => {
    setSelectedWalletId(walletId);
    
    // Загрузка информации о свободных средствах/активах
    if (walletId) {
      const assets = await fetchWalletAssets(walletId, transactionType.toLowerCase()) || [];
      const currentAsset = assets.find(a => a.tickerId === asset?.tickerId);
      setWalletFreeAmount(currentAsset?.free || 0);
    }
  };

  // Обработчик изменения тикера цены
  const handleTickerChange = (tickerId) => {
    if (tickerId) {
      // form.setFieldValue('price', tickerPrice(tickerId));
      setSelectedTicker(tickerId);
    }
  };

  return {
    wallets,
    walletAssets,
    loading,
    assetsLoading,
    walletFreeAmount,
    handleWalletChange,
    selectedWalletId,
    selectedTicker,
    handleTickerChange,
  };
};
