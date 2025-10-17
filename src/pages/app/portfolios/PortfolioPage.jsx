import PortfolioTable from '/app/src/modules/portfolios/components/PortfolioTable';
import PortfolioStatistic from '/app/src/modules/portfolios/components/PortfolioStatistic';
import PortfolioHeader from '/app/src/modules/portfolios/components/PortfolioHeader';

const PortfolioPage = ({ portfolio }) => {

  return (
    <div className="portfolio-detail">
      {/* Хедер портфеля */}
      <PortfolioHeader
        portfolio={portfolio}
        // onClose={onClose}
        // onMinimize={onMinimize}
      />

      {/* Статистика портфеля */}
      <PortfolioStatistic stats={portfolio} />

      {/* Активы портфеля */}
      <div className="portfolio-assets mt-4">
        <h5 className="mb-3">Активы портфеля</h5>
        <PortfolioTable 
          portfolio={portfolio}
          assets={portfolio.assets}
          // onAssetClick={onAssetClick}
        />
      </div>
    </div>
  );
};

export default PortfolioPage;
