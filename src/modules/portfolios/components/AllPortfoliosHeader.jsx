import React from 'react';
import { useModals } from '/app/src/hooks/useModals';

const AllPortfoliosHeader = () => {
  const { portfolio } = useModals();

  return (
    <div class="mb-5">
      <div class="row xs-mb-3">
        <div class="col-auto">
          <h1>Портфели</h1>
        </div>
        <div class="col-auto ms-auto">
          <button className="btn btn-primary" onClick={() => portfolio.open(null)} >
            Добавить портфель
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllPortfoliosHeader;
