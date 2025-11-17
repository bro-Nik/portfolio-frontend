import { useDataStore } from '/app/src/stores/dataStore';

export const useTicker = () => {
  const tickers = useDataStore(state => state.assetInfo);
  const prices = useDataStore(state => state.assetPrices);

  const getTicker = (tickerId) => {
    return tickers[tickerId];
  };

  const getTickerPrice = (tickerId) => {
    return prices[tickerId] || 0;
  };
  
  return {
    tickers,
    getTicker,
    getTickerPrice
  };
};
