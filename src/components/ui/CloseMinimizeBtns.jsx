import React from 'react';
import { useNavigation } from '/app/src/hooks/useNavigation';

const CloseMinimizeBtns = ({ id, type, parentId }) => {
  const { closeItem, minimizeItem } = useNavigation();

  return (
    <>
    <button 
      className="btn btn-outline-secondary btn-sm"
      onClick={() => minimizeItem(id, type, parentId)}
      title="Свернуть"
    >
      <i className="bi bi-dash-lg"></i>
    </button>
    <button 
      className="btn btn-outline-danger btn-sm me-3"
      onClick={() => closeItem(id, type, parentId)}
      title="Закрыть"
    >
      <i className="bi bi-x-lg"></i>
    </button>
    </>
  );
};

export default CloseMinimizeBtns;
