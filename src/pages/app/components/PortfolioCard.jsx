import React, { useState, memo } from 'react';

const PortfolioCard = memo(({ portfolio, onUpdate }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleViewDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="card portfolio-card h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="card-title mb-0">{portfolio.name}</h5>
          <span className="badge bg-primary">#{portfolio.id}</span>
        </div>
        
        <p className="card-text text-muted small mb-3">
          {portfolio.description || 'Описание отсутствует'}
        </p>

        <div className="portfolio-stats mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-muted">Стоимость:</span>
            <strong className="text-success">{formatCurrency(portfolio.total_value)}</strong>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <span className="text-muted">Создан:</span>
            <span className="text-muted small">{formatDate(portfolio.created_at)}</span>
          </div>
        </div>

        <div className="card-actions">
          <button 
            className="btn btn-outline-primary btn-sm me-2"
            onClick={handleViewDetails}
          >
            <i className={`bi ${showDetails ? 'bi-eye-slash' : 'bi-eye'} me-1`}></i>
            {showDetails ? 'Скрыть' : 'Подробнее'}
          </button>
          <button className="btn btn-outline-secondary btn-sm">
            <i className="bi bi-pencil me-1"></i>
            Редактировать
          </button>
        </div>

        {showDetails && (
          <div className="portfolio-details mt-3 pt-3 border-top">
            <h6 className="small text-muted mb-2">Детали портфеля:</h6>
            <div className="row small text-muted">
              <div className="col-6">ID пользователя:</div>
              <div className="col-6 text-end">{portfolio.user_id}</div>
              
              <div className="col-6">ID портфеля:</div>
              <div className="col-6 text-end">{portfolio.id}</div>
              
              <div className="col-6">Обновлен:</div>
              <div className="col-6 text-end">
                {portfolio.updated_at ? formatDate(portfolio.updated_at) : 'Не обновлялся'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default PortfolioCard;
