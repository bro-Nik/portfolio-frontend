import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Space, message } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useModalStore } from '/app/src/stores/modalStore';
import { usePortfolioOperations } from '../hooks/usePortfolioOperations';

const { TextArea } = Input;
const { Option } = Select;

const PortfolioEdit = () => {
  const { modalProps, closeModal } = useModalStore();
  const { 
    portfolio = null,
    title = portfolio ? 'Редактировать портфель' : 'Добавить портфель'
  } = modalProps;

  const [form] = Form.useForm();
  const [showMore, setShowMore] = useState(false);
  const { editPortfolio, loading } = usePortfolioOperations();

  useEffect(() => {
    form.setFieldsValue({
      name: portfolio?.name || '',
      market: portfolio?.market || 'crypto',
      comment: portfolio?.comment || ''
    });
    setShowMore(!!(portfolio?.comment));
  }, [portfolio, form]);

  const handleSubmit = async (values) => {
    const submitData = {
      ...values,
      // Добавляем ID если редактируем
      ...(portfolio && { id: portfolio.id })
    };

    const result = await editPortfolio(submitData);

    if (result.success) {
      message.success(portfolio ? 'Портфель обновлен' : 'Портфель создан');
      closeModal();
    } else {
      message.error(result.error || 'Произошла ошибка');
      console.log(result.error || 'Произошла ошибка')
    }
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
                { required: true, message: 'Введите название портфеля' },
                { min: 2, message: 'Минимум 2 символа' },
                { max: 50, message: 'Максимум 50 символов' }
              ]}
            >
              <Input 
                placeholder="Мой портфель" 
                autoFocus
              />
            </Form.Item>

            <Form.Item
              label="Рынок"
              name="market"
              rules={[{ required: true, message: 'Выберите рынок' }]}
            >
              <Select disabled={!!portfolio} suffixIcon=<ChevronDownIcon /> >
                <Option value="crypto">Крипто</Option>
                <Option value="stocks">Акции</Option>
                <Option value="forex">Форекс</Option>
              </Select>
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
                  placeholder="Дополнительная информация о портфеле..."
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
                {portfolio ? 'Сохранить' : 'Добавить'}
              </Button>
            </Space>
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};

export default PortfolioEdit;
