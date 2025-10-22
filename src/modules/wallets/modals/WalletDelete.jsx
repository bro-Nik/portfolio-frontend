import React, { useState } from 'react';
import { Modal, message } from 'antd';
import { useModalStore } from '/app/src/stores/modalStore';
import { walletApi } from '../api/walletApi';
import { useDataStore } from '/app/src/stores/dataStore';
import { useNavigation } from '/app/src/hooks/useNavigation';

const WalletDelete = () => {
  const { modalProps, closeModal } = useModalStore();
  const { wallet } = modalProps;
  const [loading, setLoading] = useState(false);
  const deleteWallet = useDataStore(state => state.deleteWallet);
  const { closeItem } = useNavigation();

  const handleSubmit = async (values) => {
    setLoading(true);

    const result = await walletApi.deleteWallet(wallet.id);
    if (result.success) {
      deleteWallet(result.data.wallet_id);
      closeItem(result.data.wallet_id, 'wallet')
    }
    message.success('Кошелек удален');

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
      <p>Вы уверены, что хотите удалить кошелек "{wallet.name}"?</p>
      <p style={{ color: '#ff4d4f', fontSize: '12px' }}>
        Это действие нельзя отменить.
      </p>
    </Modal>
  );
};

export default WalletDelete;
