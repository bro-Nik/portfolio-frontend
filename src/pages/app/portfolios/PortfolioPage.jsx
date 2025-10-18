import PortfolioTable from '/app/src/modules/portfolios/components/PortfolioTable';
import PortfolioStatistic from '/app/src/modules/portfolios/components/PortfolioStatistic';
import PortfolioHeader from '/app/src/modules/portfolios/components/PortfolioHeader';

const PortfolioPage = ({ portfolio }) => {

  return (
    <>
      <PortfolioHeader portfolio={portfolio} />
      <PortfolioStatistic stats={portfolio} />
      <PortfolioTable portfolio={portfolio} assets={portfolio.assets} />
    </>
  );
};

export default PortfolioPage;
