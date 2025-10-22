import { Dropdown, Button,  } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import WalletEdit from '../modals/WalletEdit';
import WalletDelete from '../modals/WalletDelete';
import { useModalStore } from '/app/src/stores/modalStore';
import {
  ArchiveBoxXMarkIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
  ArrowTopRightOnSquareIcon,
  // EllipsisVerticalIcon,
} from '@heroicons/react/16/solid'

const WalletActionsDropdown = ({ wallet }) => {
  const { openModal } = useModalStore();

  const menuItems = [
    {
      key: 'edit',
      // icon: <EditOutlined />,
      icon: <PencilIcon />,
      label: 'Редактировать',
      onClick: () => openModal(WalletEdit, { wallet }),
    },
    {
      key: 'duplicate',
      // icon: <CopyOutlined />,
      icon: <Square2StackIcon />,
      label: 'Дублировать',
      disabled: true,
    },
    {
      key: 'export',
      // icon: <ExportOutlined />,
      icon: <ArrowTopRightOnSquareIcon />,
      label: 'Экспортировать',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'archive',
      icon: <ArchiveBoxXMarkIcon />,
      label: 'Архивировать',
      disabled: true,
    },
    {
      key: 'delete',
      // icon: <DeleteOutlined />,
      icon: <TrashIcon />,
      label: 'Удалить',
      danger: true,
      onClick: () => openModal(WalletDelete, { wallet }),
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
        <Button 
          type="text" 
          icon={<MoreOutlined />}
          // icon={<EllipsisVerticalIcon />}
          onClick={(e) => e.stopPropagation()}
        />
      </Dropdown>
    </>
  );
};

export default WalletActionsDropdown;
