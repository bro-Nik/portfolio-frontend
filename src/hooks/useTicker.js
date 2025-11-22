import { useDataStore } from '/app/src/stores/dataStore';

export const useTicker = () => {
  const tickers = useDataStore(state => state.assetInfo);
  const prices = useDataStore(state => state.assetPrices);

  const getTicker = (tickerId) => {
    const ticker = tickers[tickerId];
    return {...ticker, symbol: ticker.symbol?.toUpperCase()};
  };

  const getTickerSymbol = (tickerId) => {
    return tickers[tickerId]?.symbol?.toUpperCase();
  };

  const getTickerPrice = (tickerId) => {
    return prices[tickerId] || 0;
  };
  
  return {
    tickers,
    getTicker,
    getTickerSymbol,
    getTickerPrice
  };
};
