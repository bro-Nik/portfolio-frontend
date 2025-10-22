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
      assetImages: {},        // { assetId: imagePath }
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
        const { uniqueAssets, assetImages } = get();
        
        // Добавляем только новые активы
        const newAssetIds = assetIds.filter(id => !uniqueAssets.has(id));
        if (newAssetIds.length === 0) return;

        // Добавляем новые активы в uniqueAssets
        set(state => {
          const newUniqueAssets = new Set([...state.uniqueAssets, ...newAssetIds]);
          return { uniqueAssets: newUniqueAssets };
        });
        
        // Загружаем изображения для новых активов
        get().fetchAssetImages(newAssetIds);

        // Загружаем цены для новых активов
        get().fetchAssetPrices(newAssetIds);
      },
      
      fetchAssetImages: async (assetIds) => {
        if (assetIds.length === 0) return;
        
        try {
          const api = apiService(process.env.REACT_APP_MARKET_SERVICE_URL);
          const result = await api.post('/assets/images', assetIds);
          
          if (result.success) {
            set(state => ({
              assetImages: { ...state.assetImages, ...result.data },
            }));
          }
        } catch (err) {
          console.warn('Ошибка загрузки изображений:', err);
        }
      },
      
      fetchAssetPrices: async (assetIds = null) => {
        const ids = assetIds || Array.from(get().uniqueAssets);
        if (ids.length === 0) return;
        
        try {
          const api = apiService('/api/portfolios/assets');
          const result = await api.post('/prices', ids);
          
          if (result.success) {
            set(state => ({
              assetPrices: { ...state.assetPrices, ...result.data },
              lastPriceUpdate: new Date().toISOString()
            }));
          }
        } catch (err) {
          console.warn('Ошибка загрузки цен:', err);
        }
      },
      
      // === ГЕТТЕРЫ ДЛЯ АКТИВОВ ===
      getAssetPrice: (assetId) => get().assetPrices[assetId] || 0,
      
      getAssetImage: (assetId) => {
        const imagePath = get().assetImages[assetId];
        return imagePath 
          ? process.env.REACT_APP_MARKET_SERVICE_URL + imagePath
          : '/images/placeholder.png';
      },
      
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
        if (asset.asset_id) assetSet.add(asset.asset_id);
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


export const useAssetPrice = (id) => useDataStore(state => state.assetPrices[id]);
export const useAssetImage = (id) => useDataStore(state => state.assetImages[id]);
