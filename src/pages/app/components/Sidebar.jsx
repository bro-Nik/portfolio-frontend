import React from 'react';
import { useAuth } from '/app/src/hooks/useAuth.js';
import { useNavigation } from '/app/src/hooks/useNavigation';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const { activeSection, setActiveSection, openedItems, openItem, closeItem } = useNavigation();
  const { user } = useAuth();

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
          onClick={() => openItem(item, item.itemType)}
          onClose={() => closeItem(item.id, item.itemType)}
          activeSection={activeSection}
        />
        
        {item.openedAssets?.map(asset => (
          <SidebarItem
            key={`${asset.itemType}-${asset.id}`}
            item={asset}
            onClick={() => openItem(asset, asset.itemType, item.id)}
            onClose={() => closeItem(asset.id, asset.itemType, item.id)}
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
        <UserDropdown user={user} />
      </div>
    </div>
  );
};

const SidebarItem = ({ item, onClick, onClose, activeSection }) => {
  const isActive = activeSection === `${item.itemType}-${item.id}`;
  
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
    <select className="form-select form-select-sm border-0 bg-transparent">
      <option value="ru">RU</option>
      <option value="en">EN</option>
    </select>
    <select className="form-select form-select-sm border-0 bg-transparent">
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="RUB">RUB</option>
    </select>
  </div>
);

const UserDropdown = ({ user }) => (
  <div className="dropdown">
    <a 
      href="#" 
      className="d-flex align-items-center text-decoration-none dropdown-toggle link-secondary"
      data-bs-toggle="dropdown" 
      aria-expanded="false" 
      title={user?.login}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle me-2" viewBox="0 0 16 16" ><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/><path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/></svg>
      <span className="user-login text-truncate" style={{ maxWidth: '120px' }}>
        {user?.login || ''}
      </span>
    </a>
    <ul className="dropdown-menu dropdown-menu-end shadow">
      <li>
        <a className="dropdown-item d-flex align-items-center" href="#">
          <i className="bi bi-person me-2" />
          Профиль
        </a>
      </li>
      <li>
        <a className="dropdown-item d-flex align-items-center" href="#">
          <i className="bi bi-gear me-2" />
          Настройки
        </a>
      </li>
      <li><hr className="dropdown-divider" /></li>
      <li>
        <a className="dropdown-item d-flex align-items-center text-danger" href="#">
          <i className="bi bi-box-arrow-right me-2" />
          Выход
        </a>
      </li>
    </ul>
  </div>
);

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
      <button className="btn btn-link text-secondary p-0 open-modal">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" ><path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/></svg>
      </button>
    </div>
    <hr className="my-3" />
  </>
);

export default Sidebar;
