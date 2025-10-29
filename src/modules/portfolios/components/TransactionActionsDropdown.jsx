import { Dropdown, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import PortfolioDelAssetModal from './PortfolioDelAssetModal';
import { useModalStore } from '/app/src/stores/modalStore';
import {
  ArchiveBoxXMarkIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
  ArrowTopRightOnSquareIcon,
  // EllipsisVerticalIcon,
} from '@heroicons/react/16/solid'

const TransactionActionsDropdown = ({ transaction, triggerBtn = null }) => {
  const { openModal } = useModalStore();
  if (!triggerBtn) triggerBtn = <Button type="text" icon={<MoreOutlined />} />

  const menuItems = [
    {
      key: 'edit',
      icon: <PencilIcon />,
      label: 'Редактировать',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'delete',
      icon: <TrashIcon />,
      label: 'Удалить',
      danger: true,
      disabled: true,
      // onClick: () => openModal(PortfolioDelAssetModal, { portfolio, asset }),
    },
  ];

  return (
    <>
      <Dropdown
        menu={{ items: menuItems }}
        trigger={['click']}
        placement="bottomRight"
        arrow
      >
        <div onClick={(e) => e.stopPropagation()}>{triggerBtn}</div>
      </Dropdown>
    </>
  );
};

export default TransactionActionsDropdown;
