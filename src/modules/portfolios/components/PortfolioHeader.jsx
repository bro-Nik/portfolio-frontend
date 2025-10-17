import React from 'react';
import CloseMinimizeBtns from '/app/src/components/ui/CloseMinimizeBtns';

const PortfolioHeader = ({ portfolio }) => {
  return (
    <div className="portfolio-header mb-4">
      <div className="row align-items-center">
        <div className="col">
          <div className="d-flex align-items-center">
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
            <CloseMinimizeBtns id={portfolio.id} type='portfolio' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioHeader;
