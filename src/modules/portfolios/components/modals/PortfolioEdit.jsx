import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Space, message } from 'antd';
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useModalStore } from '/app/src/stores/modalStore';
import { usePortfolioOperations } from '../../hooks/usePortfolioOperations';
import CommentField from '/app/src/features/forms/CommentField';
import ActionBtnsField from '/app/src/features/forms/ActionBtnsField';
import ShowMore from '/app/src/components/ui/ShowMore';

const { Option } = Select;

const PortfolioEditModal = () => {
  const { modalProps, closeModal } = useModalStore();
  const { 
    portfolio = null,
    title = portfolio ? 'Редактировать портфель' : 'Добавить портфель'
  } = modalProps;

  const [form] = Form.useForm();
  const { editPortfolio, loading } = usePortfolioOperations();

  useEffect(() => {
    form.setFieldsValue({
      name: portfolio?.name || '',
      market: portfolio?.market || 'crypto',
      comment: portfolio?.comment || ''
    });
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
          <ShowMore content={<CommentField />} show={!!portfolio?.comment}/>

          {/* Кнопки действий */}
          <ActionBtnsField
            title={portfolio ? 'Сохранить' : 'Добавить'} 
            onCancel={handleCancel}
            loading={loading}
          />

        </Space>
      </Form>
    </Modal>
  );
};

export default PortfolioEditModal;
