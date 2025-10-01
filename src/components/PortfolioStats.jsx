import React from 'react';

const PortfolioStats = ({ stats }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    // }).format(amount);
    }).format(parseInt(amount));
  };

  var percent = '';
  if (stats.totalProfit && stats.totalAmount > 1) {
    percent = stats.totalProfit / stats.totalAmount * 100
    percent = `(${parseInt(percent)}%)`;
  }

  const statCards = [
    {
      title: 'Стоимость сейчас',
      value: formatCurrency(stats.totalCostNow),
    },
    {
      title: 'Вложено',
      value: formatCurrency(stats.totalAmount),
    },
    {
      title: 'Прибыль',
      value: `${formatCurrency(stats.totalProfit)} ${percent}`,
      class: stats.totalProfit > 0 ? 'text-green' : 'text-red',
    },
    {
      title: 'В ордерах на покупку',
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

export default PortfolioStats;
