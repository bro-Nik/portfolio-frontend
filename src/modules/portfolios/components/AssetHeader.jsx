import React from 'react';
import { Space, Button } from 'antd';
import CloseMinimizeBtns from '/app/src/components/ui/CloseMinimizeBtns';
import AssetActionsDropdown from './AssetActionsDropdown';
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { formatCurrency } from '/app/src/utils/format';

const AssetHeader = ({ portfolio, asset, data }) => {
  return (
    <div className="asset-header mb-4">
      <div className="row">
        <div className="col">
          <div className="d-flex align-items-center">
            <div>
              <h1 className="fs-6 text-muted m-0">
                {asset.name} 
                <span className="text-uppercase">({asset.ticker})</span>
                {/* <span class="badge text-bg-light text-muted">#{rank}</span> */}
              </h1>

              <div className="hstack gap-2">
                <img className="img-asset" src={asset.image.replace('/24/', '/40/')} />
                <span className="fs-1 fw-semibold">{formatCurrency(asset.price)}</span>
              </div>

              <div className="text-muted small">
                <span className="me-3">Портфель: {portfolio.name}</span>
                <span className="text-capitalize">Рынок: {portfolio.market}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-auto ms-auto">
          <Space>
            {/* <Button type="primary"  onClick={() => openModal(AssetModal, {  })} > */}
            <Button type="primary" >
              Добавить транзакцию
            </Button>
            <AssetActionsDropdown portfolio={portfolio} asset={asset}
              triggerBtn={<Button icon={<ChevronDownIcon />}>Еще</Button>}
            />
          </Space>
        </div>
      </div>
      <CloseMinimizeBtns id={asset.id} type='portfolio_asset' parentId={portfolio.id} />
    </div>
  );
};

export default AssetHeader;
