import { Dropdown, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import AssetDeleteModal from './modals/AssetDelete';
import { useModalStore } from '/app/src/stores/modalStore';
import {
  ArchiveBoxXMarkIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
  ArrowTopRightOnSquareIcon,
  // EllipsisVerticalIcon,
} from '@heroicons/react/16/solid'

const AssetActionsDropdown = ({ portfolio, asset, triggerBtn = null }) => {
  const { openModal } = useModalStore();

  const menuItems = [
    {
      key: 'edit',
      icon: <PencilIcon />,
      label: 'Редактировать',
      disabled: true,
    },
    {
      key: 'duplicate',
      icon: <Square2StackIcon />,
      label: 'Переместить',
      disabled: true,
    },
    {
      key: 'export',
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
      icon: <TrashIcon />,
      label: 'Удалить',
      danger: true,
      onClick: () => openModal(AssetDeleteModal, { portfolio, asset }),
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
        {triggerBtn ? (
          // Кастомный триггер (кнопка "Еще" или другая)
          <div onClick={(e) => e.stopPropagation()}>
            {triggerBtn}
          </div>
        ) : (
          // Триггер по умолчанию (иконка)
          <Button 
            type="text" 
            icon={<MoreOutlined />}
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </Dropdown>
    </>
  );
};

export default AssetActionsDropdown;
