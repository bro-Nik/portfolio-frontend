import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // TODO: Replace with actual user data fetching
    setUser({
      email: "user@example.com",
      type: "user"
    });
    
  }, []);

  const fetchWorkedAlertsCount = async () => {
    try {
    } catch (error) {
      console.error('Error fetching alerts count:', error);
    }
  };

  const getUserName = (email) => {
    return email ? email.split('@')[0] : '';
  };

  if (!user) return null;

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
        <NavItem 
          href="/portfolio/portfolios" 
          icon="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"
          text="Портфели"
        />
        <NavItem 
          href="/wallet/wallets"
          icon="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"
          text="Кошельки"
        />
        <NavItem 
          href="/watchlist/assets"
          icon="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z M2.242 2.194a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.256-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53z"
          text="Избранное"
        />
      </ul>

      <LocaleSelectors />
      
      <hr />
      <UserDropdown user={user} />
    </div>
  );
};

const NavItem = ({ href, icon, text, isActive = false }) => {
  // TODO: Implement active state based on current route
  return (
    <li className="nav-item">
      <a href={href} className={`nav-link ${isActive ? 'active' : 'link-body-emphasis'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
          <path d={icon} />
        </svg>
        {text}
      </a>
    </li>
  );
};

const LocaleSelectors = () => {
  // TODO: Implement locale and currency selection logic
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
  const getUserName = (email) => {
    return email ? email.split('@')[0] : '';
  };

  return (
    <div className="dropdown">
      <a href="#" className="d-flex align-items-center text-decoration-none dropdown-toggle link-secondary"
        data-bs-toggle="dropdown" aria-expanded="false" title={getUserName(user.email)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-circle me-2" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
        </svg>
        <strong>{getUserName(user.email)}</strong>
      </a>
      <ul className="dropdown-menu">
        {user.type !== 'demo' ? (
          <>
            <li>
              <a className="dropdown-item" href="/user/settings/profile">
                Настройки
              </a>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <a className="dropdown-item" href="/user/logout">
                Выход
              </a>
            </li>
          </>
        ) : (
          <li>
            <a className="dropdown-item" href="/user/register">
              Регистрация
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
