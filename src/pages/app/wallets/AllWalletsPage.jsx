import React from 'react';
import { AllWalletsStatistic } from '/app/src/modules/wallets/components/AllWalletsStatistic';
import AllWalletsTable from '/app/src/modules/wallets/components/AllWalletsTable';
import AllWalletsHeader from '/app/src/modules/wallets/components/AllWalletsHeader';
import { useWalletsData } from '/app/src/modules/wallets/hooks/useWalletsData';
import LoadingSpinner from '/app/src/components/ui/LoadingSpinner';

const WalletsPage = () => {
  const { wallets, overallStats, loading } = useWalletsData();

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <AllWalletsHeader />

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
