import React from 'react';
import AllPortfoliosHeader from '/app/src/modules/portfolios/components/AllPortfoliosHeader';
import AllPortfoliosStatistic from '/app/src/modules/portfolios/components/AllPortfoliosStatistic';
import AllPortfoliosTable from '/app/src/modules/portfolios/components/AllPortfoliosTable';
import LoadingSpinner from '/app/src/components/ui/LoadingSpinner';
import { usePortfoliosData } from '/app/src/modules/portfolios/hooks/usePortfoliosData';

const PortfoliosPage = () => {
  const { portfolios, overallStats, loading } = usePortfoliosData();

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <AllPortfoliosHeader />

      <div className="row xs-mb-3">
        <AllPortfoliosStatistic stats={overallStats} />
      </div>

      <div className="row">
        <AllPortfoliosTable portfolios={portfolios} />
      </div>
    </>
  );
};

export default PortfoliosPage;
