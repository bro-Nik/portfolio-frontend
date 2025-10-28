import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { apiService } from '/app/src/services/api';

export const useDataStore = create(
  devtools(
    (set, get) => ({
      portfolios: null,
      wallets: null,
      wishlist: [],
      
      assetPrices: {},        // { assetId: price }
      assetInfo: {},        // { assetId: info }
      uniqueAssets: new Set(), // Set для отслеживания уникальных активов
      lastPriceUpdate: null,
      
      // ДЕЙСТВИЯ ДЛЯ ПОРТФЕЛЕЙ
      setPortfolios: (portfolios) => {
        set({ portfolios }),
        // Автоматически добавляем активы портфелей
        get().addAssets(portfolios);
      },
      
      addPortfolio: (portfolio) => {
        set(state => ({
          portfolios: [...(state.portfolios || []), portfolio]
        }));
        // Автоматически добавляем активы нового портфеля
        get().addAssets([portfolio]);
      },
      
      updatePortfolio: (portfolioId, updatedData) => {
        set(state => ({
          portfolios: state.portfolios.map(portfolio =>
            portfolio.id === portfolioId ? { ...portfolio, ...updatedData } : portfolio
          )
        }));
        // Автоматически добавляем активы портфеля
        get().addAssets([updatedData]);
      },
      
      deletePortfolio: (portfolioId) => {
        set(state => ({
          portfolios: state.portfolios.filter(
            portfolio => portfolio.id !== portfolioId
          )
        }));
      },
      
      // === ДЕЙСТВИЯ ДЛЯ АКТИВОВ ===
      addAssets: (assetsData) => {
        const assetIds = extractUniqueAssets(assetsData);
        const { uniqueAssets } = get();
        
        // Добавляем только новые активы
        const newAssetIds = assetIds.filter(id => !uniqueAssets.has(id));
        if (newAssetIds.length === 0) return;

        // Добавляем новые активы в uniqueAssets
        set(state => {
          const newUniqueAssets = new Set([...state.uniqueAssets, ...newAssetIds]);
          return { uniqueAssets: newUniqueAssets };
        });
        
        // Загружаем цены для новых активов
        console.log('Загружаем цены для новых активов')
        get().fetchAssetPrices(newAssetIds);

        // Загружаем информацию для новых активов
        get().fetchAssetInfo(newAssetIds);
      },
      
      fetchAssetPrices: async (assetIds = null) => {
        const ids = assetIds || Array.from(get().uniqueAssets);
        if (ids.length === 0) return;
        
        try {
          const api = apiService('/market/api/tickers');
          const result = await api.post('/prices', ids);
          
          if (result.success) {
            set(state => ({
              assetPrices: { ...state.assetPrices, ...result.data.prices },
              lastPriceUpdate: new Date().toISOString()
            }));
          }
        } catch (err) {
          console.warn('Ошибка загрузки цен:', err);
        }
      },

      fetchAssetInfo: async (assetIds) => {
        if (assetIds.length === 0) return;
        const ids = assetIds || Array.from(get().uniqueAssets);
        if (ids.length === 0) return;
        
        try {
          const api = apiService('/market/api/tickers');
          const result = await api.post('/info', ids);
          
          if (result.success) {
            console.log(result.data.info)
            set(state => ({
              assetInfo: { ...state.assetInfo, ...result.data.info },
            }));
          }
        } catch (err) {
          console.warn('Ошибка загрузки информации:', err);
        }
      },
      
      // === ГЕТТЕРЫ ДЛЯ АКТИВОВ ===
      getAssetPrice: (assetId) => get().assetPrices[assetId] || 0,
      
      // === ДЕЙСТВИЯ ДЛЯ КОШЕЛЬКОВ ===
      setWallets: (wallets) => {
        set({ wallets });
        // Автоматически добавляем активы кошельков
        get().addAssets(wallets);
      },
      
      addWallet: (wallet) => {
        set(state => ({
          wallets: [...state.wallets, wallet]
        }));
        get().addAssets([wallet]);
      },

      updateWallet: (walletId, updatedData) => {
        set(state => ({
          wallets: state.wallets.map(wallet =>
            wallet.id === walletId ? { ...wallet, ...updatedData } : wallet
          )
        }));
      },

      deleteWallet: (walletId) => {
        set(state => ({
          wallets: state.wallets.filter(
            wallet => wallet.id !== walletId
          )
        }));
      },
      
    }),
    { name: 'Data Store' }
  )
);

// Вспомогательная функция
const extractUniqueAssets = (data) => {
  const assetSet = new Set();
  
  const processItem = (item) => {
    if (item.assets) {
      item.assets.forEach(asset => {
        if (asset.ticker_id) assetSet.add(asset.ticker_id);
      });
    }
    if (item.portfolios) item.portfolios.forEach(processItem);
    if (item.wishlist) item.wishlist.forEach(processItem);
  };

  if (Array.isArray(data)) {
    data.forEach(processItem);
  } else {
    processItem(data);
  }
  
  return Array.from(assetSet);
};


// export const useAssetPrice = (id) => useDataStore(state => state.assetPrices[id]);
