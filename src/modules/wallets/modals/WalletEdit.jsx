import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Space, message } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useModalStore } from '/app/src/stores/modalStore';
import { walletApi } from '../api/walletApi';
import { useDataStore } from '/app/src/stores/dataStore';

const { TextArea } = Input;
const { Option } = Select;

const WalletEdit = () => {
  const { modalProps, closeModal } = useModalStore();
  const { 
    wallet = null,
    title = wallet ? 'Редактировать кошелек' : 'Добавить кошелек'
  } = modalProps;

  const [form] = Form.useForm();
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const addWallet = useDataStore(state => state.addWallet);
  const updateWallet = useDataStore(state => state.updateWallet);

  useEffect(() => {
    form.setFieldsValue({
      name: wallet?.name || '',
      comment: wallet?.comment || ''
    });
    setShowMore(!!(wallet?.comment));
  }, [wallet, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    const submitData = {
      ...values,
      // Добавляем ID если редактируем
      ...(wallet && { id: wallet.id })
    };

    const result = await walletApi.saveWallet(submitData);
    
    if (result.success) {
      if (wallet?.id) {
        updateWallet(wallet.id, result.data);
      } else {
        addWallet(result.data);
      }
      message.success(wallet ? 'Кошелек обновлен' : 'Кошелек создан');
      closeModal();
    } else {
      // message.error(result.error || 'Произошла ошибка');
      console.log(result.error || 'Произошла ошибка')
    }
    setLoading(false);
  };

  const handleCancel = () => {
    form.resetFields();
    closeModal();
  };

  return (
    <Modal
      title={title}
      open={true}
      onCancel={handleCancel}
      footer={null}
      width={500}
      destroyOnClose
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark="optional"
        size="middle"
      >
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          {/* Основные поля */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Form.Item
              label="Название"
              name="name"
              rules={[
                { required: true, message: 'Введите название кошелька' },
                { min: 2, message: 'Минимум 2 символа' },
                { max: 50, message: 'Максимум 50 символов' }
              ]}
            >
              <Input 
                placeholder="Мой кошелек" 
                autoFocus
              />
            </Form.Item>
          </div>

          {/* Кнопка "Еще" */}
          <Button 
            type="link" 
            icon={showMore ? <MinusOutlined /> : <PlusOutlined />}
            onClick={() => setShowMore(!showMore)}
            style={{ padding: 0, height: 'auto', }}
          >
            {showMore ? 'Скрыть' : 'Еще'}
          </Button>

          {/* Дополнительные поля */}
          {showMore && (
            <div style={{ animation: 'fadeIn 0.3s ease-in' }}>
              <Form.Item
                label="Комментарий"
                name="comment"
                rules={[
                  { max: 500, message: 'Максимум 500 символов' }
                ]}
              >
                <TextArea
                  placeholder="Дополнительная информация о кошельке..."
                  rows={3}
                  showCount
                  maxLength={500}
                />
              </Form.Item>
            </div>
          )}

          {/* Кнопки действий */}
          <Form.Item style={{ marginBottom: 0 }}>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={handleCancel}>
                Отмена
              </Button>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                // icon={portfolio ? <EditOutlined /> : <PlusOutlined />}
              >
                {wallet ? 'Сохранить' : 'Добавить'}
              </Button>
            </Space>
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};

export default WalletEdit;
