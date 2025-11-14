import { useModalStore } from '/app/src/stores/modalStore';
import {
  ArchiveBoxXMarkIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/16/solid'
import ActionsDropdown from '/app/src/features/dropdowns/ActionsDropdown';

const TransactionActionsDropdown = ({ transaction, btn }) => {
  const { openModal } = useModalStore();

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

  return <ActionsDropdown items={menuItems} btn={btn}/>;
};

export default TransactionActionsDropdown;
