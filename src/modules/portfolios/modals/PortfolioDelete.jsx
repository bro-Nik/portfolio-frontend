import React, { useState } from 'react';
import { Modal, message } from 'antd';
import { useModalStore } from '/app/src/stores/modalStore';
import { portfolioApi } from '../api/portfolioApi';
import { useDataStore } from '/app/src/stores/dataStore';
import { useNavigation } from '/app/src/hooks/useNavigation';

const PortfolioDelete = () => {
  const { modalProps, closeModal } = useModalStore();
  const { portfolio } = modalProps;
  const [loading, setLoading] = useState(false);
  const deletePortfolio = useDataStore(state => state.deletePortfolio);
  const { closeItem } = useNavigation();

  const handleSubmit = async (values) => {
    setLoading(true);

    message.success('Тестовое сообщение');
    const result = await portfolioApi.deletePortfolio(portfolio.id);
    if (result.success) {
      deletePortfolio(result.data.portfolio_id);
      closeItem(result.data.portfolio_id, 'portfolio')
    }
    message.success('Портфель удален');

    setLoading(false);
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };
    message.success('Тестовое сообщение');

  return (
    <Modal
      title="Подтверждение удаления"
      open={true}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText="Удалить"
      cancelText="Отмена"
      okType="danger"
      centered
      confirmLoading={loading}
    >
      <p>Вы уверены, что хотите удалить портфель "{portfolio.name}"?</p>
      <p style={{ color: '#ff4d4f', fontSize: '12px' }}>
        Это действие нельзя отменить.
      </p>
    </Modal>
  );
};

export default PortfolioDelete;
