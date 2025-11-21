import { useState, useCallback, useEffect } from 'react';
import { useDataStore } from '/app/src/stores/dataStore';
import { useTicker } from '/app/src/hooks/useTicker';
import { useWalletsData } from '/app/src/modules/wallets/hooks/useWalletsData';

export const useTransactionData = ({ asset, walletId, portfolioId, transaction, transactionType }) => {
  const [transactionPortfolios, setTransactionPortfolios] = useState([]);
  const [transactionWallets, setTransactionWallets] = useState([]);
  const portfolios = useDataStore(state => state.portfolios);
  const wallets = useDataStore(state => state.wallets);

  const [selectedWallet, setSelectedWallet] = useState();
  const [selectedTicker, setSelectedTicker] = useState(transaction?.ticker2Id);

  const { getWallet } = useWalletsData();
  const { getTickerSymbol, getTickerPrice } = useTicker();

  const isPortfolioTransaction = !!portfolioId;
  const isWalletTransaction = !!walletId;
  const isTransfer = ['TransferOut', 'TransferIn'].includes(transactionType);
  const isBuy = ['Buy'].includes(transactionType);
  const isSpend = ['Sell', 'Output'].includes(transactionType);
  const isReceive = ['Input', 'Earning'].includes(transactionType);

  const getPortfoliosToTransfer = () => {
    return portfolios
    .filter(portfolio => portfolio.id !== portfolioId)
    .map(portfolio => ({ ...portfolio, free: getAssetFree(portfolio.assets) }));
  };

  const getWalletsToTransfer = () => {
    return wallets
    .filter(wallet => wallet.id !== walletId)
    .map(wallet => ({ ...wallet, free: getAssetFree(wallet.assets) }));
  };

  const getWalletsToBuy = () => {
    return wallets
  };

  const getWalletAssetsToBuy = (assets) => {
    return assets
    .filter(a => a.tickerId !== asset.tickerId)
  };

  // Расчет количества актива
  const getAssetFree = (assets) => {
    return assets?.find(a => a.tickerId === asset.tickerId)?.quantity || 0;
  };

  const getWalletsToReceive = () => {
    return wallets.map(wallet => ({ ...wallet, free: getAssetFree(wallet.assets) }));
  };

  const getWalletsToSpend = () => {
    return wallets.map(wallet => ({ ...wallet, free: getAssetFree(wallet.assets) }));
  };

  useEffect(() => {
    // Транзакция в портфелях
    if (isPortfolioTransaction) {
      if (isTransfer) setTransactionPortfolios(getPortfoliosToTransfer())
      else if (isBuy) setTransactionWallets(getWalletsToBuy())
      else if (isSpend) setTransactionWallets(getWalletsToSpend())
      else if (isReceive) setTransactionWallets(getWalletsToReceive())
    }

    // Транзакция в кошельках
    if (isWalletTransaction) {
      if (isTransfer) setTransactionWallets(getWalletsToTransfer())
    }

  }, [transactionType]);

  useEffect(() => {
    // Транзакция в портфелях
    if (isPortfolioTransaction) {
      if (isTransfer) setSelectedWallet(null);
    }

  }, [transactionType]);

  const handleWalletChange = (walletId) => {
    const wallet = getWallet(walletId)

    const updatedWallet = {
      ...wallet,
      free: getAssetFree(wallet.assets),
      assets: getWalletAssetsToBuy(wallet?.assets)?.map(a => ({
        ...a,
        free: a.quantity || 0,
        symbol: getTickerSymbol(a.tickerId) }))
    }
    setSelectedWallet(updatedWallet);
  };

  // Обработчик изменения тикера цены
  const handleTickerChange = (tickerId) => {
    if (tickerId) {
      const ticker = {
        id: tickerId,
        symbol: getTickerSymbol(tickerId),
        price: getTickerPrice(tickerId),
      };

      setSelectedTicker(ticker);
    }
  };

  return {
    portfolios: transactionPortfolios,
    wallets: transactionWallets,
    handleWalletChange,
    selectedWallet,
    selectedTicker,
    handleTickerChange,
  };
};
