import React from 'react';
import { formatCurrency } from '/app/src/utils/format';
import StatisticCards from '/app/src/features/statistics/StatisticCards';

const AssetDetail = ({ data }) => {



  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <h6 className="mb-0">Инвестиционная информация</h6>
          </div>
          <div className="card-body">
            <div className="row mb-2">
              <div className="col-6">
                <small className="text-muted">Общая сумма вложений</small>
                <div className="fw-bold">{formatCurrency(data.asset_info.amount)}</div>
              </div>
              <div className="col-6">
                <small className="text-muted">В ордерах на покупку</small>
                <div className="fw-bold">{formatCurrency(data.asset_info.buy_orders)}</div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-6">
                <small className="text-muted">Текущая стоимость</small>
                <div className="fw-bold">{formatCurrency(data.current_market_data.current_value)}</div>
              </div>
              <div className="col-6">
                <small className="text-muted">Доля в портфеле</small>
                <div className="fw-bold">{data.portfolio_info.weight_in_portfolio?.toFixed(2)}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <h6 className="mb-0">Детали распределения</h6>
          </div>
          <div className="card-body">
            {data.distribution.portfolios.map((portfolio, index) => (
              <div key={portfolio.portfolio_id} className="row mb-2">
                <div className="col-8">
                  <div className="fw-bold">{portfolio.portfolio_name}</div>
                  <small className="text-muted">{portfolio.quantity} шт.</small>
                </div>
                <div className="col-4 text-end">
                  <div className="fw-bold">{formatCurrency(portfolio.amount)}</div>
                  <small className="text-muted">{portfolio.percentage_of_total.toFixed(1)}%</small>
                </div>
              </div>
            ))}
            <div className="row mt-3 pt-2 border-top">
              <div className="col-8">
                <strong>Всего:</strong>
              </div>
              <div className="col-4 text-end">
                <strong>{formatCurrency(data.distribution.total_amount_all_portfolios)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetail;
