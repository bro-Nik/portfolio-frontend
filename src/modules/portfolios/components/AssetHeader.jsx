import React from 'react';
import CloseMinimizeBtns from '/app/src/components/ui/CloseMinimizeBtns';

const AssetHeader = ({ data }) => {
  return (
    <div className="asset-header mb-4">
      <div className="row align-items-center">
        <div className="col">
          <div className="d-flex align-items-center">
            <div>
              <h1 className="h3 mb-1">
                {data.asset_info.name} ({data.asset_info.symbol})
              </h1>
              <div className="text-muted small">
                <span className="me-3">Портфель: {data.portfolio_info.portfolio_name}</span>
                <span>Рынок: {data.portfolio_info.portfolio_market}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-auto">
          <div className="btn-group">
            <button className="btn btn-outline-primary btn-sm">
              <i className="bi bi-pencil me-2"></i>
              Редактировать
            </button>
          </div>
        </div>
      </div>
      <CloseMinimizeBtns id={data.asset_info.id} type='portfolio_asset' parentId={data.portfolio_info.portfolio_id} />
    </div>
  );
};

export default AssetHeader;
