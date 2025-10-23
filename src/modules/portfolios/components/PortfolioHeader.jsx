import React from 'react';
import { Button, Space } from 'antd';
import CloseMinimizeBtns from '/app/src/components/ui/CloseMinimizeBtns';
import PortfolioActionsDropdown from './PortfolioActionsDropdown'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import AddAsset from '/app/src/modules/assets/modals/AddAsset';
import { useModalStore } from '/app/src/stores/modalStore';
import PortfolioAddAssetModal from './PortfolioAddAssetModal';

const PortfolioHeader = ({ portfolio }) => {
  const { openModal } = useModalStore();

  return (
    <div className="portfolio-header mb-4">
      <div className="row align-items-center">
        <div className="col">
          <div className="d-flex align-items-center">
            <div>
              <h1 className="h3 mb-1">{portfolio.name}</h1>
              <div className="text-muted small">
                <span className="me-3">Рынок: {portfolio.market}</span>
                <span>Активов: {portfolio.assets.length}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-auto ms-auto">
          <Space>
            <Button type="primary"  onClick={() => openModal(PortfolioAddAssetModal, { portfolio: portfolio })} >
              Добавить актив
            </Button>
            <PortfolioActionsDropdown
              portfolio={portfolio}
              triggerBtn={<Button icon={<ChevronDownIcon />}>Еще</Button>}
            />
          </Space>

        </div>

      </div>
      <CloseMinimizeBtns id={portfolio.id} type='portfolio' />
    </div>
  );
};

export default PortfolioHeader;
