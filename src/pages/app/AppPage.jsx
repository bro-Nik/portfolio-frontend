import React, { Suspense } from 'react';
import Sidebar from './components/Sidebar';
import PortfolioPage from './portfolios/PortfolioPage';
import AssetPage from './portfolios/AssetPage';
import { useNavigation } from '/app/src/hooks/useNavigation';
// import { usePriceSync } from '/app/src/hooks/usePriceSync';
import './styles/App.css';
import PortfoliosPage from './portfolios/AllPortfoliosPage'
import WalletsPage from './wallets/AllWalletsPage'
import WishlistPage from './WishlistPage'
import { useModalStore } from '/app/src/stores/modalStore';


const ModalContainer = () => {
  const { currentModal: ModalComponent, modalProps } = useModalStore();
  if (!ModalComponent) return null;

  return <ModalComponent {...modalProps} />;
};


const AppPage = () => {
  const { activeSection, openedItems } = useNavigation();

  const mainSections = {
    'portfolios': PortfoliosPage,
    'wallets': WalletsPage,
    'wishlist': WishlistPage,
  }

  // Рендер основных разделов
  const renderMainSection = () => {
    return Object.entries(mainSections).map(([sectionName, SectionComponent]) => (
      <div 
        key={sectionName} 
        style={{ display: activeSection === sectionName ? 'block' : 'none' }}
      >
        <Suspense>
          <SectionComponent />
        </Suspense>
      </div>
    ));
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
      {/* {usePriceSync()} */}
      <Sidebar />
      
      <div id="wrapper">
        <div id="content" className="p-5">
          {renderMainSection()}
          {renderOpenedItems()}
        </div>
      </div>
      <ModalContainer />
    </>
  );
};

export default AppPage;
