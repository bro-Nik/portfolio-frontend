import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { apiService } from '/app/src/services/api';

export const useAssetsStore = create(
  devtools(
    (set, get) => ({
      // State
      prices: {},
      images: {},
      uniqueAssets: new Set(), // Используем Set для уникальности
      loading: false,
      lastPriceUpdate: null,
      
      // Actions
      addAssets: (assetsData) => {
        const newAssets = extractUniqueAssets(assetsData);
        const currentState = get();
        
        // Добавляем только новые активы
        const assetsToAdd = newAssets.filter(assetId => 
          !currentState.uniqueAssets.has(assetId)
        );
        
        if (assetsToAdd.length === 0) return;
        
        set(state => {
          const newUniqueAssets = new Set([...state.uniqueAssets, ...assetsToAdd]);
          return { uniqueAssets: newUniqueAssets };
        });
        
        // Загружаем изображения для новых активов
        get().fetchAssetImages(assetsToAdd);
      },
      
      fetchAssetImages: async (assetIds) => {
        if (assetIds.length === 0) return;
        
        // Фильтруем уже загруженные изображения
        const { images } = get();
        const assetsToLoad = assetIds.filter(assetId => !images[assetId]);
        if (assetsToLoad.length === 0) return;
        
        try {
          set({ loading: true });
          const api = apiService(process.env.REACT_APP_MARKET_SERVICE_URL);
          const result = await api.post('/assets/images', assetsToLoad);
          
          if (result.success) {
            set(state => ({
              images: { ...state.images, ...result.data },
              loading: false
            }));
          }
        } catch (error) {
          console.warn('Ошибка загрузки изображений:', error);
          set({ loading: false });
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
              prices: { ...state.prices, ...result.data },
              lastPriceUpdate: new Date().toISOString()
            }));
          }
        } catch (error) {
          console.warn('Ошибка загрузки цен:', error);
        }
      },
      
      // Геттеры
      getAssetPrice: (assetId) => get().prices[assetId],
      getAssetImage: (assetId) => process.env.REACT_APP_MARKET_SERVICE_URL + (get().images[assetId] || '/images/placeholder.png'),
      
      // Для отладки
      getStats: () => {
        const state = get();
        return {
          totalAssets: state.uniqueAssets.size,
          pricesLoaded: Object.keys(state.prices).length,
          imagesLoaded: Object.keys(state.images).length,
          lastUpdate: state.lastPriceUpdate
        };
      }
    }),
    { name: 'Assets Store' }
  )
);

// Селекторы
export const useAssetPrice = (assetId) => 
  useAssetsStore(state => state.prices[assetId]);

export const useAssetImage = (assetId) => 
  useAssetsStore(state => state.images[assetId] || '/images/placeholder.png');

export const useAssetsLoading = () => 
  useAssetsStore(state => state.loading);

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
