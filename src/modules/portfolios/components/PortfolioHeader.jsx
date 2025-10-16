import React from 'react';

const PortfolioHeader = ({ portfolio, onClose, onMinimize }) => {

  return (
    <div className="portfolio-header mb-4">
      <div className="row align-items-center">
        <div className="col">
          <div className="d-flex align-items-center">
            <button 
              className="btn btn-outline-secondary btn-sm"
              onClick={() => onMinimize()}
              title="Свернуть"
            >
              <i className="bi bi-dash-lg"></i>
            </button>
            <button 
              className="btn btn-outline-danger btn-sm me-3"
              onClick={() => onClose()}
              title="Закрыть"
            >
              <i className="bi bi-x-lg"></i>
            </button>
            <div>
              <h1 className="h3 mb-1">{portfolio.name}</h1>
              <div className="text-muted small">
                <span className="me-3">Рынок: {portfolio.market}</span>
                <span>Активов: {portfolio.assets.length}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-auto">
          <div className="btn-group">
            <button className="btn btn-outline-primary btn-sm">
              <i className="bi bi-pencil me-2"></i>
              Редактировать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioHeader;
