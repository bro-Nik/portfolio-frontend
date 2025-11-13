import React from 'react';
import { Button, Space } from 'antd';
import CloseMinimizeBtns from '/app/src/components/ui/CloseMinimizeBtns';
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useModalStore } from '/app/src/stores/modalStore';
import WalletActionsDropdown from '../WalletActionsDropdown'

const WalletHeader = ({ wallet }) => {
  const { openModal } = useModalStore();

  return (
    <div className="portfolio-header mb-4">
      <div className="row align-items-center">
        <div className="col">
          <div className="d-flex align-items-center">
            <div>
              <h1 className="h3 mb-1">{wallet.name}</h1>
              <div className="text-muted small">
                <span>Активов: {wallet.assets.length}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-auto ms-auto">
          <Space>
            <WalletActionsDropdown
              wallet={wallet}
              triggerBtn={<Button icon={<ChevronDownIcon />}>Еще</Button>}
            />
          </Space>
        </div>

      </div>
      <CloseMinimizeBtns id={wallet.id} type='wallet' />
    </div>
  );
};

export default WalletHeader;
