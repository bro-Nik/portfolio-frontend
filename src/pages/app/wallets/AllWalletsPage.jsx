import React from 'react';
import { AllWalletsStatistic } from '/app/src/modules/wallets/components/AllWalletsStatistic';
import AllWalletsTable from '/app/src/modules/wallets/components/AllWalletsTable';
import { useWalletsData } from '/app/src/modules/wallets/hooks/useWalletsData';
import LoadingSpinner from '/app/src/components/ui/LoadingSpinner';

const WalletsPage = () => {
  const { wallets, overallStats, loading } = useWalletsData();
  console.log(wallets)

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <div className="mb-5">
        <div className="row xs-mb-3">
          <div className="col-auto">
            <h1>Кошельки</h1>
          </div>
        </div>
      </div>

      <div className="row xs-mb-3">
        <AllWalletsStatistic stats={overallStats} />
      </div>

      <div className="row">
        <AllWalletsTable wallets={wallets} />
      </div>
    </>
  );
};

export default WalletsPage;
