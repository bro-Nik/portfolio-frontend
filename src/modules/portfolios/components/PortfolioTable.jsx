import React from 'react';
import { useAssetsStore } from '/app/src/stores/assetsStore';
import { formatCurrency, formatPercentage } from '/app/src/utils/format';

const PortfolioTable = ({ portfolio, assets, onAssetClick, ...props }) => {
  const { getAssetPrice, getAssetImage } = useAssetsStore();

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">Активы портфеля</h5>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Актив</th>
                <th>Количество</th>
                <th>Средняя цена</th>
                <th>Текущая цена</th>
                <th>Стоимость</th>
                <th>Прибыль</th>
              </tr>
            </thead>
            <tbody>
              {assets?.map(asset => {
                const currentPrice = getAssetPrice(asset.asset_id);
                const currentValue = asset.quantity * currentPrice;
                const invested = asset.amount;
                const averagePrice = invested / asset.quantity;
                const profit = currentValue - invested;
                const profitPercentage = invested > 0 ? (profit / invested) * 100 : 0;
                const image = getAssetImage(asset.asset_id);


                return (
                  <tr key={asset.asset_id}>
                    <td
                      className="cursor-pointer"
                      onClick={() => onAssetClick(asset, portfolio)}
                    >
                      <div className="text-average d-flex gap-2 name">
                        <img className="img-asset-min" loading="lazy" src={getAssetImage(asset.asset_id)} />
                        <span className="text-truncate" title="Polkastarter">{asset.name}</span>
                        <span className="text-muted text-uppercase">{asset.ticker}</span>
                      </div>
                    </td>
                    <td>{asset.quantity}</td>
                    <td>{formatCurrency(averagePrice)}</td>
                    <td>{formatCurrency(currentPrice)}</td>
                    <td>{formatCurrency(currentValue)}</td>
                    <td className={profit >= 0 ? 'text-success' : 'text-danger'}>
                      {formatCurrency(profit)}
                      <small>({formatPercentage(profitPercentage)})</small>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PortfolioTable;
