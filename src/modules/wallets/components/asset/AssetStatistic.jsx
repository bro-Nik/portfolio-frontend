import React from 'react';
import { formatCurrency, formatPercentage } from '/app/src/utils/format';
import StatisticCards from '/app/src/features/statistics/StatisticCards';

const AssetStatistic = ({ portfolio, asset }) => {

  const statCards = [
    {
      title: 'Количество',
      value: asset.quantity,
      description: ''
    },
    {
      title: 'Текущая стоимость',
      value: formatCurrency(asset.price),
      description: 'Общая стоимость активов по текущим ценам'
    },
    {
      title: 'В ордерах на покупку',
      value: formatCurrency(asset.buyOrders),
      description: ''
    },
    {
      title: 'В ордерах на продажу',
      value: formatCurrency(asset.sellOrders),
      description: ''
    },
    {
      title: 'Свободно',
      value: formatCurrency(asset.free),
      description: 'Прибыль/убыток за все время'
    }
  ];

  return <StatisticCards cards={statCards} />;
};

export default AssetStatistic;
