import { useDataStore } from '/app/src/stores/dataStore';

export const getTickerInfo = () => {
  const info = useDataStore(state => state.assetInfo);
  const prices = useDataStore(state => state.assetPrices);

  const tickerName = (tickerId) => info[tickerId]?.name;
  const tickerSymbol = (tickerId) => info[tickerId]?.symbol.toUpperCase();
  const tickerPrice = (tickerId) => prices[tickerId];
  return {
    tickerName,
    tickerSymbol,
    tickerPrice
  };
};
