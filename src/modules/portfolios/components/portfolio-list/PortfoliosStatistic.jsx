import React from 'react';
import { formatCurrency, formatPercentage } from '/app/src/utils/format';
import StatisticCards from '/app/src/features/statistics/StatisticCards';

const PortfoliosStatistic = ({ stats }) => {
  const profitPercentage = stats.totalInvested > 0 ? (stats.totalProfit / stats.totalInvested) * 100 : 0;

  const statCards = [
    {
      title: 'Стоимость',
      value: formatCurrency(stats.totalCostNow),
    },
    {
      title: 'Вложено',
      value: formatCurrency(stats.totalInvested),
    },
    {
      title: 'Прибыль',
      value: `${formatCurrency(stats.totalProfit)} (${formatPercentage(profitPercentage)})`,
      class: stats.totalProfit > 0 ? 'text-green' : 'text-red',
    },
    {
      title: 'В ордерах',
      value: formatCurrency(stats.totalBuyOrders),
    }
  ];

  return <StatisticCards cards={statCards} />;
};

export default PortfoliosStatistic;
