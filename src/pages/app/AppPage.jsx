import React, { Suspense } from 'react';
import Sidebar from './components/Sidebar';
import PortfolioPage from './portfolios/PortfolioPage';
import AssetPage from './portfolios/AssetPage';
import { useNavigation } from '/app/src/hooks/useNavigation';
import { usePriceSync } from '/app/src/hooks/usePriceSync';
import './styles/App.css';

const PortfoliosPage = React.lazy(() => import('./portfolios/AllPortfoliosPage'));
const WalletsPage = React.lazy(() => import('./wallets/AllWalletsPage'));
const WishlistPage = React.lazy(() => import('./WishlistPage'));

const AppPage = () => {
  const { activeSection, openedItems, setActiveSection } = useNavigation();

  const mainSections = {
    'portfolios': PortfoliosPage,
    'wallets': WalletsPage,
    'wishlist': WishlistPage,
  }

  // Рендер основных разделов
  const renderMainSection = () => {
    const Section = mainSections[activeSection];
    if (!Section) return null;

    return (
      <Suspense fallback={<div>Загрузка...</div>}>
        <Section style={{ display: 'block' }} />
      </Suspense>
    );
  };

  // Рендер всех открытых элементов
  const renderOpenedItems = () => {
    const renderItems = [];
    
    // Рендер портфелей и их активов
    openedItems.portfolios.forEach(portfolio => {
      // Портфель
      if (activeSection === `portfolio-${portfolio.id}`) {
        renderItems.push(
          <PortfolioPage key={`portfolio-${portfolio.id}`} portfolio={portfolio} />
        );
      }
      
      // Активы портфеля
      portfolio.openedAssets.forEach(asset => {
        if (activeSection === `portfolio_asset-${asset.id}`) {
          renderItems.push(
            <AssetPage key={`asset-${asset.id}`} asset={asset} />
          );
        }
      });
    });
    
    // Аналогично для wallets и wishlist
    // openedItems.wallets.forEach(wallet => {
    //   if (activeSection === `wallet-${wallet.id}`) {
    //     renderItems.push(
    //       <WalletPage key={`wallet-${wallet.id}`} wallet={wallet} />
    //     );
    //   }
    //   
    //   wallet.assets.forEach(asset => {
    //     if (activeSection === `wallet_asset-${asset.id}`) {
    //       renderItems.push(
    //         <WalletAssetPage key={`wallet-asset-${asset.id}`} asset={asset} />
    //       );
    //     }
    //   });
    // });
    
    return renderItems;
  };

  return (
    <>
      {usePriceSync()}
      <Sidebar />
      
      <div id="wrapper">
        <div id="content" className="p-5">
          {renderMainSection()}
          {renderOpenedItems()}
        </div>
      </div>
    </>
  );
};

export default AppPage;
