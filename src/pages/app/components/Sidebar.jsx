import React from 'react';
import { useAuthStore } from '/app/src/stores/authStore';
import { useNavigation } from '/app/src/hooks/useNavigation';
import { Dropdown, Space, Avatar, Menu, Select } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined, BellOutlined, DownOutlined } from '@ant-design/icons';
import { UserCircleIcon, ChevronDownIcon, UserIcon } from '@heroicons/react/16/solid'
import '../styles/Sidebar.css';

const Sidebar = () => {
  const { activeSection, setActiveSection, openedItems, openItem, closeItem } = useNavigation();
  const { user, logout } = useAuthStore();

  const menuItems = [
    { id: 'portfolios', label: 'Портфели', icon: <i className="bi bi-briefcase me-2" /> },
    { id: 'wallets', label: 'Кошельки', icon: <i className="bi bi-wallet me-2" /> },
    { id: 'wishlist', label: 'Избранное', icon: <i className="bi bi-star me-2" /> }
  ];

  const renderItemGroup = (items, section) => {
    if (!items?.length) return null;

    return items.map(item => (
      <div key={`${section}-${item.id}`} className="mb-1">
        <SidebarItem
          item={item}
          onClick={() => openItem(item, item.type)}
          onClose={() => closeItem(item.id, item.type)}
          activeSection={activeSection}
        />
        
        {item.openedAssets?.map(asset => (
          <SidebarItem
            key={`${asset.type}-${asset.id}`}
            item={asset}
            onClick={() => openItem(asset, asset.type, item.id)}
            onClose={() => closeItem(asset.id, asset.type, item.id)}
            activeSection={activeSection}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary sidebar" style={{ width: '250px' }}>
      <SidebarHeader />
      
      <nav className="nav nav-pills flex-column mb-auto">
        {menuItems.map(({ id, label, icon }) => (
          <div key={id} className="nav-item">
            <button
              className={`nav-link w-100 text-start ${ activeSection === id ? 'active' : 'link-body-emphasis'}`}
              onClick={() => setActiveSection(id)}
            >
              {icon}
              {label}
            </button>
            
            {renderItemGroup(openedItems[id], id)}
          </div>
        ))}
      </nav>

      <div className="mt-auto">
        <LocaleSelectors />
        <hr className="my-3" />
        <UserDropdown user={user} logout={logout} />
      </div>
    </div>
  );
};

const SidebarItem = ({ item, onClick, onClose, activeSection }) => {
  const isActive = activeSection === `${item.type}-${item.id}`;
  
  return (
    <div className={`d-flex align-items-center ps-3 ${isActive ? 'active' : ''}`}>
      <a 
        href="#"
        className="flex-grow-1 text-truncate small"
        onClick={(e) => { e.preventDefault(); onClick(); }}
        title={item.name}
      >
        {item.name}
      </a>
      <button 
        className="btn btn-sm btn-link text-muted p-0 ms-2"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        title="Закрыть"
        type="button"
      >
        <i className="bi bi-x" />
      </button>
    </div>
  );
};

const LocaleSelectors = () => (
  <div className="d-flex align-items-center justify-content-between">
    <Select
      size="small"
      variant="borderless"
      defaultValue="ru"
      // style={{ width: 80 }}
      suffixIcon=<ChevronDownIcon />
      options={[
        { value: 'ru', label: 'RU' },
        { value: 'en', label: 'EN' },
      ]}
    />
    <Select
      size="small"
      variant="borderless"
      defaultValue="USD"
      // style={{ width: 80 }}
      suffixIcon=<ChevronDownIcon />
      options={[
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'RUB', label: 'RUB' },
      ]}
    />
  </div>
);

const UserDropdown = ({ user, logout }) => {
  const menuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Профиль',
      onClick: () => console.log('Профиль')
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Настройки',
      disabled: true,
      onClick: () => console.log('Настройки')
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Выход',
      danger: true,
      onClick: logout
    }
  ];

  return (
    <Dropdown
      menu={{ items: menuItems }}
      trigger={['click']}
      placement="topRight"
      arrow
    >
      <Space className="text-secondary" style={{ cursor: 'pointer' }}>
        <Avatar 
          size="small" 
          // icon={<UserCircleIcon />}
          icon={<UserIcon />}
        />
        <span className="user-login text-truncate" style={{ maxWidth: '120px' }}>
          {user?.login || 'Гость'}
          <ChevronDownIcon />
        </span>
      </Space>
    </Dropdown>
  );
};

const SidebarHeader = () => (
  <>
    <div className="d-flex gap-2 align-items-center">
      <a 
        href="/" 
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      >
        <img className="mb-0 me-2" src="/favicon.png" alt="Логотип" width="32" height="32" />
        <span className="fs-4">Portfolios</span>
      </a>
      <BellOutlined style={{ fontSize: '16px', color: '#6c757d', cursor: 'pointer' }} />
    </div>
    <hr className="my-3" />
  </>
);

export default Sidebar;
