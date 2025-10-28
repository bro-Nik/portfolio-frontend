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
      title: 'Средняя цена',
      value: formatCurrency(asset.invested / asset.quantity),
      description: ''
    },
    {
      title: 'Текущая стоимость',
      value: formatCurrency(asset.price),
      description: 'Общая стоимость активов по текущим ценам'
    },
    {
      title: 'Вложено средств',
      value: formatCurrency(asset.invested),
      description: 'Общая сумма инвестиций'
    },
    {
      title: 'Прибыль/убыток',
      value: `${formatCurrency(asset.profit)} (${formatPercentage(asset.profitPercentage)})`,
      class: asset.profit >= 0 ? 'text-green' : 'text-red',
      description: 'Прибыль/убыток за все время'
    }
  ];

  return <StatisticCards cards={statCards} />;
};

export default AssetStatistic;
