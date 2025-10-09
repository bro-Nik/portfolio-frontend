import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import PortfolioCard from './components/PortfolioCard';
import PortfolioTable from './components/PortfolioTable';
import PortfolioStats from './components/PortfolioStats';
import LoadingSpinner from '/app/src/components/LoadingSpinner';
import EmptyState from '/app/src/components/EmptyState';
import { useMediaQuery } from '/app/src/hooks/useMediaQuery';
import { useReactTable } from '@tanstack/react-table'
import { useAuth } from '/app/src/hooks/useAuth.js'
import { ROUTES } from '/app/src/constants/routes';
import './styles/App.css';

const AppPage = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('auto'); // 'auto', 'table', 'cards'
  const isMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();
  const { user } = useAuth();


  // Автоматический выбор режима просмотра
  const displayMode = useMemo(() => {
    if (viewMode === 'auto') {
      return isMobile ? 'cards' : 'table';
    }
    return viewMode;
  }, [viewMode, isMobile]);

  // Мемоизированная функция загрузки данных
  const fetchPortfolios = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/portfolios/user/1');
      
      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }
      
      const data = await response.json();
      setPortfolios(data.portfolios || []);
    } catch (err) {
      console.error('Error fetching portfolios:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  // Мемоизированная статистика
  const stats = useMemo(() => {
    const totalAmount = portfolios.reduce((sum, p) => sum + p.amount, 0);
    const totalCostNow = portfolios.reduce((sum, p) => sum + p.cost_now, 0);
    const totalBuyOrders = portfolios.reduce((sum, p) => sum + p.buy_orders, 0);
    return {
      totalCostNow,
      totalAmount,
      totalProfit: portfolios.length > 0 ? totalCostNow - totalAmount : 0,
      totalBuyOrders
    };
  }, [portfolios]);

  // Обработчик обновления портфеля
  const handlePortfolioUpdate = useCallback((updatedPortfolio) => {
    setPortfolios(prev => 
      prev.map(p => p.id === updatedPortfolio.id ? updatedPortfolio : p)
    );
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (

    <div className="mb-5">
    <div className="mb-5">
      <div className="row xs-mb-3">
        <div className="col-auto">
          <h1>Портфели</h1>
            <h2>{user.email}</h2>
        </div>
        <div className="col-auto ms-auto">
          <button className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>
            Добавить портфель
          </button>
        </div>
      </div>
        {/* Переключатель вида */}
        {/* <div className="btn-group view-toggle" role="group"> */}
        {/*   <input */}
        {/*     type="radio" */}
        {/*     className="btn-check" */}
        {/*     name="viewMode" */}
        {/*     id="viewAuto" */}
        {/*     checked={viewMode === 'auto'} */}
        {/*     onChange={() => setViewMode('auto')} */}
        {/*   /> */}
        {/*   <label className="btn btn-outline-secondary" htmlFor="viewAuto"> */}
        {/*     <i className="bi bi-magic"></i> */}
        {/*   </label> */}
        {/**/}
        {/*   <input */}
        {/*     type="radio" */}
        {/*     className="btn-check" */}
        {/*     name="viewMode" */}
        {/*     id="viewTable" */}
        {/*     checked={viewMode === 'table'} */}
        {/*     onChange={() => setViewMode('table')} */}
        {/*   /> */}
        {/*   <label className="btn btn-outline-secondary" htmlFor="viewTable"> */}
        {/*     <i className="bi bi-table"></i> */}
        {/*   </label> */}
        {/**/}
        {/*   <input */}
        {/*     type="radio" */}
        {/*     className="btn-check" */}
        {/*     name="viewMode" */}
        {/*     id="viewCards" */}
        {/*     checked={viewMode === 'cards'} */}
        {/*     onChange={() => setViewMode('cards')} */}
        {/*   /> */}
        {/*   <label className="btn btn-outline-secondary" htmlFor="viewCards"> */}
        {/*     <i className="bi bi-grid-3x3-gap"></i> */}
        {/*   </label> */}
        {/* </div> */}
    </div>

    <div className="row xs-mb-3">
      <PortfolioStats stats={stats} />
    </div>

    <div className="row">
      {portfolios.length > 0 ? (
        displayMode === 'table' ? (
          <PortfolioTable 
            portfolios={portfolios} 
            onUpdate={handlePortfolioUpdate}
          />
        ) : (
          <div className="row">
            {portfolios.map(portfolio => (
              <div key={portfolio.id} className="col-12 col-md-6 col-xl-4 mb-4">
                <PortfolioCard 
                  portfolio={portfolio} 
                  onUpdate={handlePortfolioUpdate}
                />
              </div>
            ))}
          </div>
        )
      ) : (
        <EmptyState />
      )}
    </div>
    </div>
  );
};

export default AppPage;
