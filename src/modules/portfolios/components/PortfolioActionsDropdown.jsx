import { Dropdown, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { useModalStore } from '/app/src/stores/modalStore';
import PortfolioEditModal from './modals/PortfolioEdit';
import PortfolioDeleteModal from './modals/PortfolioDelete';
import {
  ArchiveBoxXMarkIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
  ArrowTopRightOnSquareIcon,
  // EllipsisVerticalIcon,
} from '@heroicons/react/16/solid'

const PortfolioActionsDropdown = ({ portfolio, triggerBtn = null }) => {
  const { openModal } = useModalStore();

  const menuItems = [
    {
      key: 'edit',
      // icon: <EditOutlined />,
      icon: <PencilIcon />,
      label: 'Редактировать',
      onClick: () => openModal(PortfolioEditModal, { portfolio: portfolio }),
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
      onClick: () => openModal(PortfolioDeleteModal, { portfolio: portfolio }),
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

export default PortfolioActionsDropdown;
