import React from 'react';
import { formatCurrency, formatPercentage } from '/app/src/utils/format';

export const AllPortfoliosStatistic = ({ stats }) => {
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

  return (
    <div className="row mb-4">
      {statCards.map((card, index) => (
        <div key={index} className="col-auto">
          <p className="small-text">{card.title}</p>
          <span className={`text-average ${card.class || ''}`}>{card.value}</span>
        </div>
      ))}
    </div>
  );
};
