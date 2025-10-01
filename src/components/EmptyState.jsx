import React from 'react';

const EmptyState = () => (
  <div className="col-12">
    <div className="card">
      <div className="card-body text-center py-5">
        <i className="bi bi-inbox display-4 text-muted mb-3"></i>
        <h5 className="text-muted">Портфели не найдены</h5>
        <p className="text-muted mb-0">У вас пока нет созданных портфелей</p>
      </div>
    </div>
  </div>
);

export default EmptyState;
