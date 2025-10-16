import React from 'react';
import { useAuth } from '/app/src/hooks/useAuth.js'
import '../styles/Sidebar.css';

const Sidebar = ({ 
  activeSection, 
  onSectionChange, 
  openedItems, 
  onItemClick,
  onItemClose 
}) => {
  const menuItems = [
    { 
      id: 'portfolios', 
      label: 'Портфели', 
      icon: <i className="bi bi-briefcase me-2"></i>,
    },
    { 
      id: 'wallets', 
      label: 'Кошельки', 
      icon: <i className="bi bi-wallet me-2"></i>,
    },
    { 
      id: 'wishlist', 
      label: 'Избранное', 
      icon: <i className="bi bi-star me-2"></i>,
    }
  ];
  
  const { user } = useAuth();

  // Группируем открытые элементы: портфели и их активы
  const groupedItems = openedItems.reduce((acc, item) => {
    if (item.itemType === 'portfolio') {
      acc.portfolios.push(item);
    } else if (item.itemType === 'asset') {
      const portfolioId = item.portfolio_id;
      if (!acc.assetsByPortfolio[portfolioId]) {
        acc.assetsByPortfolio[portfolioId] = [];
      }
      acc.assetsByPortfolio[portfolioId].push(item);
    }
    return acc;
  }, { portfolios: [], assetsByPortfolio: {} });

  // Функция для получения иконки элемента
  const getItemIcon = (itemType) => {
    switch (itemType) {
      case 'portfolio':
        return 'bi-folder';
      case 'asset':
        return 'bi-coin';
      default:
        return 'bi-file-earmark';
    }
  };

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{ width: '250px' }}>
      <div className="d-flex gap-2">
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto1 link-body-emphasis text-decoration-none">
          <img className="mb-0 me-2" src="/favicon.png" alt="" width="32" height="32" />
          <span className="fs-4">Portfolios</span>
        </a>
        <span className="link-secondary open-modal d-flex align-items-center" 
              data-modal-id="WorkedAlertsModal"
              data-url="/watchlist/assets?status=worked&modal=true">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
          </svg>
        </span>
      </div>

      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map(item => {
          // Для раздела "Портфели" показываем группированные элементы
          const showPortfolioItems = item.id === 'portfolios' && 
            (groupedItems.portfolios.length > 0 || Object.keys(groupedItems.assetsByPortfolio).length > 0);
          
          return (
            <li key={item.id} className="nav-item">
              <a
                href="#"
                className={`nav-link ${activeSection === item.id ? 'active' : 'link-body-emphasis'}`}
                onClick={() => onSectionChange(item.id)}
              >
                {item.icon}
                {item.label}
              </a>

              {/* Подменю для открытых портфелей и их активов */}
              {showPortfolioItems && (
                <div className="opened-items">
                  <ul className="list-unstyled mt-2">
                    {groupedItems.portfolios.map(portfolio => {
                      const portfolioAssets = groupedItems.assetsByPortfolio[portfolio.id] || [];
                      const isPortfolioActive = activeSection === `portfolio-${portfolio.id}`;
                      
                      return (
                        <li key={`portfolio-${portfolio.id}`} className="mb-1">
                          {/* Портфель */}
                          <div className={`d-flex align-items-center ps-3 ${isPortfolioActive ? 'active' : ''}`}>
                            <a 
                              href="#" 
                              className="flex-grow-1 text-truncate small"
                              onClick={(e) => { 
                                e.preventDefault(); 
                                onItemClick(portfolio); 
                              }}
                              title={portfolio.name}
                            >
                              <i className={`bi me-2 ${getItemIcon(portfolio.itemType)}`}></i>
                              {portfolio.name}
                            </a>
                            <button 
                              className="btn btn-sm btn-link text-muted p-0 ms-2"
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                onItemClose(portfolio); 
                              }}
                              title="Закрыть"
                            >
                              <i className="bi bi-x"></i>
                            </button>
                          </div>
                          
                          {/* Активы этого портфеля */}
                          {portfolioAssets.length > 0 && (
                            <ul className="list-unstyled ms-4">
                              {portfolioAssets.map(asset => (
                                <li 
                                  key={`asset-${asset.id}`}
                                  className={activeSection === `asset-${asset.id}` ? 'active' : ''}
                                >
                                  <div className="d-flex align-items-center">
                                    <a 
                                      href="#" 
                                      className="flex-grow-1 text-truncate small"
                                      onClick={(e) => { 
                                        e.preventDefault(); 
                                        onItemClick(asset); 
                                      }}
                                      title={asset.name}
                                    >
                                      <i className={`bi me-2 ${getItemIcon(asset.itemType)}`}></i>
                                      {asset.name}
                                    </a>
                                    <button 
                                      className="btn btn-sm btn-link text-muted p-0 ms-2"
                                      onClick={(e) => { 
                                        e.stopPropagation(); 
                                        onItemClose(asset); 
                                      }}
                                      title="Закрыть"
                                    >
                                      <i className="bi bi-x"></i>
                                    </button>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <LocaleSelectors />
      
      <hr />
      <UserDropdown user={user} />
    </div>
  );
};

const LocaleSelectors = () => {
  return (
    <div className="d-flex align-items-center">
      <div>
        <select className="form-select border-0 link-secondary bg-transparent">
          <option value="ru">RU</option>
          <option value="en">EN</option>
        </select>
      </div>
      <div>
        <select className="form-select border-0 link-secondary bg-transparent">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="RUB">RUB</option>
        </select>
      </div>
    </div>
  );
};

const UserDropdown = ({ user }) => {
  return (
    <div className="dropdown">
      <a href="#" className="d-flex align-items-center text-decoration-none dropdown-toggle link-secondary"
        data-bs-toggle="dropdown" aria-expanded="false" title={user?.login}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-circle me-2" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
        </svg>
        <strong>{user?.login}</strong>
      </a>
      <ul className="dropdown-menu">
        <li><a className="dropdown-item" href="#">Настройки</a></li>
        <li><hr className="dropdown-divider" /></li>
        <li><a className="dropdown-item" href="#">Выход</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
