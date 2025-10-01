// components/PortfolioTable.jsx
import React, { useState, memo } from 'react';

const PortfolioTable = memo(({ portfolios, onUpdate }) => {
  const [expandedRow, setExpandedRow] = useState(null);

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
      month: 'short',
      day: 'numeric'
    });
  };

  const toggleRow = (portfolioId) => {
    setExpandedRow(expandedRow === portfolioId ? null : portfolioId);
  };

  return (
    <div className="portfolio-table">
      {/* Заголовки таблицы */}
      <div className="table-header d-none d-md-grid">
        <div className="table-row header-row">
          <div className="table-cell">Название</div>
          <div className="table-cell">Описание</div>
          <div className="table-cell text-end">Стоимость</div>
          <div className="table-cell text-end">Создан</div>
          <div className="table-cell text-center">Действия</div>
        </div>
      </div>

      {/* Тело таблицы */}
      <div className="table-body">
        {portfolios.map(portfolio => (
          <div key={portfolio.id} className="table-item">
            {/* Основная строка */}
            <div 
              className={`table-row main-row ${expandedRow === portfolio.id ? 'expanded' : ''}`}
              onClick={() => toggleRow(portfolio.id)}
            >
              <div className="table-cell">
                <div className="portfolio-name">
                  <strong>{portfolio.name}</strong>
                  <span className="badge bg-primary ms-2">#{portfolio.id}</span>
                </div>
                <div className="mobile-only text-muted small mt-1">
                  {portfolio.description || 'Описание отсутствует'}
                </div>
              </div>
              
              <div className="table-cell d-none d-md-block">
                <span className="text-muted">
                  {portfolio.description || '—'}
                </span>
              </div>
              
              <div className="table-cell text-end">
                <span className="value-amount text-success">
                  {formatCurrency(portfolio.total_value)}
                </span>
              </div>
              
              <div className="table-cell text-end d-none d-md-block">
                <span className="text-muted">
                  {formatDate(portfolio.created_at)}
                </span>
              </div>
              
              <div className="table-cell text-center">
                <div className="action-buttons">
                  <button 
                    className="btn btn-sm btn-outline-primary me-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleRow(portfolio.id);
                    }}
                  >
                    <i className={`bi ${expandedRow === portfolio.id ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-secondary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Раскрывающаяся секция с деталями */}
            {expandedRow === portfolio.id && (
              <div className="table-details">
                <div className="details-content">
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="text-muted mb-3">Детали портфеля</h6>
                      <div className="detail-item">
                        <span className="label">ID пользователя:</span>
                        <span className="value">{portfolio.user_id}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">ID портфеля:</span>
                        <span className="value">{portfolio.id}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Обновлен:</span>
                        <span className="value">
                          {portfolio.updated_at ? formatDate(portfolio.updated_at) : 'Не обновлялся'}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h6 className="text-muted mb-3">Быстрые действия</h6>
                      <div className="d-flex gap-2 flex-wrap">
                        <button className="btn btn-outline-primary btn-sm">
                          <i className="bi bi-graph-up me-1"></i>
                          Аналитика
                        </button>
                        <button className="btn btn-outline-success btn-sm">
                          <i className="bi bi-download me-1"></i>
                          Экспорт
                        </button>
                        <button className="btn btn-outline-info btn-sm">
                          <i className="bi bi-share me-1"></i>
                          Поделиться
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

export default PortfolioTable;
