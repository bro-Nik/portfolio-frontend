import React from 'react';
import { formatCurrency, formatPercentage } from '/app/src/utils/format';
import StatisticCards from '/app/src/features/statistics/StatisticCards';
import { useAssetsStore } from '/app/src/stores/assetsStore';

const AssetStatistic = ({ data }) => {

  const { getAssetPrice } = useAssetsStore();

  const invested = data.asset_info.amount;
  const costNow = getAssetPrice(data.asset_info.ticker_id);
  const profit = costNow - invested;
  const profitPercentage = invested > 0 ? (profit / invested) * 100 : 0;

  const statCards = [
    {
      title: 'Количество',
      value: data.asset_info.quantity,
      description: ''
    },
    {
      title: 'Средняя цена',
      value: formatCurrency(invested / data.asset_info.quantity || 0),
      description: ''
    },
    {
      title: 'Текущая стоимость',
      value: formatCurrency(costNow),
      description: 'Общая стоимость активов по текущим ценам'
    },
    {
      title: 'Вложено средств',
      value: formatCurrency(invested),
      description: 'Общая сумма инвестиций'
    },
    {
      title: 'Прибыль/убыток',
      value: `${formatCurrency(profit)} (${formatPercentage(profitPercentage)})`,
      class: profit >= 0 ? 'text-green' : 'text-red',
      description: 'Прибыль/убыток за все время'
    }
  ];

  return <StatisticCards cards={statCards} />;
};

export default AssetStatistic;
