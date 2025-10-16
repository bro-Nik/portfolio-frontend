import React, { useState, Suspense } from 'react';
import Sidebar from './components/Sidebar';
import PortfolioPage from './portfolios/PortfolioPage';
import AssetPage from './portfolios/AssetPage';
import { usePriceSync } from '/app/src/hooks/usePriceSync';
import './styles/App.css';

const PortfoliosPage = React.lazy(() => import('./portfolios/AllPortfoliosPage'));
const WalletsPage = React.lazy(() => import('./WalletsPage'));
const WishlistPage = React.lazy(() => import('./WishlistPage'));

const AppPage = () => {
  const [activeSection, setActiveSection] = useState('portfolios');
  const [loadedSections, setLoadedSections] = useState({
    portfolios: true,
    wallets: false,
    wishlist: false
  });

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setLoadedSections(prev => ({
      ...prev,
      [section]: true
    }));
  };

  // Состояние для открытых элементов
  const [openedItems, setOpenedItems] = useState([]);

  // Функции для работы с портфелями
  const openPortfolio = (portfolio) => {
    const portfolioWithType = { 
      ...portfolio, 
      isMinimized: false,
      itemType: 'portfolio'
    };
    
    setOpenedItems(prev => {
      const existing = prev.find(item => item.id === portfolio.id && item.itemType === 'portfolio');
      if (existing) return prev;
      return [...prev, portfolioWithType];
    });
    
    setActiveSection(`portfolio-${portfolio.id}`);
  };

  const closePortfolio = (portfolioId) => {
    // Закрываем портфель и все его активы
    setOpenedItems(prev => prev.filter(item => 
      !(item.id === portfolioId && item.itemType === 'portfolio') &&
      !(item.portfolio_id === portfolioId && item.itemType === 'asset')
    ));
    
    if (activeSection === `portfolio-${portfolioId}`) {
      setActiveSection('portfolios');
    }
  };

  const minimizePortfolio = (portfolioId) => {
    setOpenedItems(prev => 
      prev.map(item => 
        item.id === portfolioId && item.itemType === 'portfolio' 
          ? { ...item, isMinimized: true } 
          : item
      )
    );
    
    if (activeSection === `portfolio-${portfolioId}`) {
      setActiveSection('portfolios');
    }
  };

  const maximizePortfolio = (portfolioId) => {
    setOpenedItems(prev => 
      prev.map(item => 
        item.id === portfolioId && item.itemType === 'portfolio' 
          ? { ...item, isMinimized: false } 
          : item
      )
    );
    setActiveSection(`portfolio-${portfolioId}`);
  };

  // Функции для работы с активами портфелей
  const openAsset = (asset, portfolio) => {
    const assetWithContext = {
      ...asset,
      portfolio_id: portfolio.id, // Важно: передаем ID портфеля
      portfolio_name: portfolio.name,
      itemType: 'asset'
    };

    setOpenedItems(prev => {
      const existing = prev.find(item => item.id === asset.id && item.itemType === 'asset');
      if (existing) return prev;
      return [...prev, { ...assetWithContext, isMinimized: false }];
    });
    
    setActiveSection(`asset-${asset.id}`);
  };

  const closeAsset = (assetId) => {
    setOpenedItems(prev => prev.filter(item => !(item.id === assetId && item.itemType === 'asset')));
    
    if (activeSection === `asset-${assetId}`) {
      // Возвращаемся к портфелю актива, если он открыт
      const closedAsset = openedItems.find(item => item.id === assetId && item.itemType === 'asset');
      if (closedAsset?.portfolio_id) {
        const portfolioExists = openedItems.find(item => 
          item.id === closedAsset.portfolio_id && item.itemType === 'portfolio'
        );
        if (portfolioExists) {
          setActiveSection(`portfolio-${closedAsset.portfolio_id}`);
        } else {
          setActiveSection('portfolios');
        }
      } else {
        setActiveSection('portfolios');
      }
    }
  };

  const minimizeAsset = (assetId) => {
    setOpenedItems(prev => 
      prev.map(item => 
        item.id === assetId && item.itemType === 'asset' 
          ? { ...item, isMinimized: true } 
          : item
      )
    );
    
    if (activeSection === `asset-${assetId}`) {
      const minimizedAsset = openedItems.find(item => item.id === assetId && item.itemType === 'asset');
      if (minimizedAsset?.portfolio_id) {
        setActiveSection(`portfolio-${minimizedAsset.portfolio_id}`);
      } else {
        setActiveSection('portfolios');
      }
    }
  };

  const maximizeAsset = (assetId) => {
    setOpenedItems(prev => 
      prev.map(item => 
        item.id === assetId && item.itemType === 'asset' 
          ? { ...item, isMinimized: false } 
          : item
      )
    );
    setActiveSection(`asset-${assetId}`);
  };

  // Общие функции для работы с открытыми элементами
  const handleOpenedItemClick = (item) => {
    if (item.itemType === 'portfolio') {
      maximizePortfolio(item.id);
    } else if (item.itemType === 'asset') {
      maximizeAsset(item.id);
    }
  };

  const handleOpenedItemClose = (item) => {
    if (item.itemType === 'portfolio') {
      closePortfolio(item.id);
    } else if (item.itemType === 'asset') {
      closeAsset(item.id);
    }
  };

  // Рендер основных разделов
  const renderSection = (section, Component) => {
    if (!loadedSections[section]) {
      return null;
    }

    return (
      <div style={{ display: activeSection === section ? 'block' : 'none' }}>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Component 
            onPortfolioClick={openPortfolio}
            onAssetClick={openAsset}
          />
        </Suspense>
      </div>
    );
  };

  // Рендер деталей портфеля
  const renderPortfolioDetail = (portfolio) => {
    const portfolioSection = `portfolio-${portfolio.id}`;
    
    if (!loadedSections.portfolios) return null;

    return (
      <div key={portfolio.id} style={{ display: activeSection === portfolioSection ? 'block' : 'none' }}>
        <PortfolioPage 
          portfolio={portfolio}
          onClose={() => closePortfolio(portfolio.id)}
          onMinimize={() => minimizePortfolio(portfolio.id)}
          onAssetClick={openAsset}
        />
      </div>
    );
  };

  // Рендер деталей актива
  const renderAssetDetail = (asset) => {
    const assetSection = `asset-${asset.id}`;
    
    if (!loadedSections.portfolios) return null;

    return (
      <div key={asset.id} style={{ display: activeSection === assetSection ? 'block' : 'none' }}>
        <AssetPage 
          asset={asset}
          onClose={() => closeAsset(asset.id)}
          onMinimize={() => minimizeAsset(asset.id)}
        />
      </div>
    );
  };

  // Фильтруем открытые элементы по типам для рендера
  const openedPortfolios = openedItems.filter(item => item.itemType === 'portfolio' && !item.isMinimized);
  const openedAssets = openedItems.filter(item => item.itemType === 'asset' && !item.isMinimized);

  return (
    <React.Fragment>
      {usePriceSync()}

      <Sidebar 
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        openedItems={openedItems}
        onItemClick={handleOpenedItemClick}
        onItemClose={handleOpenedItemClose}
      />
      
      <div id="wrapper">
        <div id="content" className="p-5">
          {/* Основные разделы */}
          {renderSection('portfolios', PortfoliosPage)}
          {renderSection('wallets', WalletsPage)}
          {renderSection('wishlist', WishlistPage)}
          
          {/* Детали открытых портфелей */}
          {openedPortfolios.map(portfolio => renderPortfolioDetail(portfolio))}
          
          {/* Детали открытых активов */}
          {openedAssets.map(asset => renderAssetDetail(asset))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default AppPage;
