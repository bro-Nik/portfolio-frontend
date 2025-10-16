import React from 'react';
import { formatCurrency, formatPercentage } from '/app/src/utils/format';
import StatisticCards from '/app/src/features/statistics/StatisticCards';

const PortfolioStatistic = ({ stats }) => {

  const statCards = [
    {
      title: 'Текущая стоимость',
      value: formatCurrency(stats.costNow),
      description: 'Общая стоимость активов по текущим ценам'
    },
    {
      title: 'Вложено средств',
      value: formatCurrency(stats.invested),
      description: 'Общая сумма инвестиций'
    },
    {
      title: 'Прибыль/убыток',
      value: `${formatCurrency(stats.profit)} (${formatPercentage(stats.profitPercentage || 0)})`,
      class: stats.totalProfit >= 0 ? 'text-green' : 'text-red',
      description: 'Прибыль/убыток за все время'
    },
  ];

  return <StatisticCards cards={statCards} />;
};

export default PortfolioStatistic;
