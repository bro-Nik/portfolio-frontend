import React from 'react';
import { AllPortfoliosStatistic } from '/app/src/modules/portfolios/components/AllPortfoliosStatistic';
import AllPortfoliosTable from '/app/src/modules/portfolios/components/AllPortfoliosTable';
import { usePortfoliosData } from '/app/src/modules/portfolios/hooks/usePortfoliosData';
import LoadingSpinner from '/app/src/components/ui/LoadingSpinner';

const PortfoliosPage = () => {
  const { portfolios, overallStats, loading } = usePortfoliosData();

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <div className="mb-5">
        <div className="row xs-mb-3">
          <div className="col-auto">
            <h1>Портфели</h1>
          </div>
        </div>
      </div>

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
