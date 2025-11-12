import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Space, Radio, Checkbox, message, InputNumber } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useModalStore } from '/app/src/stores/modalStore';
import { useWallets } from './hooks/useWallets';
import { usePortfolios } from './hooks/usePortfolios';
// import { useTransactionOperations } from '../hooks/useTransactionOperations';
import { useTransactionCalculations } from './hooks/useTransactionCalculations';
import { PORTFOLIO_TYPES } from './constants/transactionTypes';
import { useTransactionForm } from './hooks/useTransactionForm';
import { getTickerInfo } from './utils/transactionHelpers';
import { usePortfolioOperations } from '/app/src/modules/portfolios/hooks/usePortfolioOperations';

const { Option } = Select;
const { TextArea } = Input;

const TransactionEdit = () => {
  const { modalProps, closeModal } = useModalStore();
  const { 
    asset = null,
    portfolioId = null,
    transaction = null,
    title = transaction?.id ? 'Изменить транзакцию' : 'Добавить транзакцию'
  } = modalProps;

  const { editTransaction, loading } = usePortfolioOperations();

  const [form] = Form.useForm();
  const availableTypes = PORTFOLIO_TYPES;
  const { tickerSymbol, tickerPrice } = getTickerInfo();

  const { 
    showMore, 
    transactionType, 
    calculationType, 
    toggleShowMore, 
    toggleCalculationType, 
    handleTypeChange 
  } = useTransactionForm(transaction, form);

  const { 
    wallets,
    loading: walletsLoading,
    handleWalletChange,
    walletAssets, 
    assetsLoading,
    selectedWalletId,
    selectedTicker,
    handleTickerChange,
    walletFreeAmount,
  } = useWallets(asset, transaction, transactionType);

  const { handleQuantityChange, handleAmountChange, handlePriceChange } = useTransactionCalculations(form, calculationType);
  const { portfolios, fetchPortfolios } = usePortfolios(transactionType);

  const isSellType = ['Sell', 'Output', 'TransferOut'].includes(transactionType);
  const showOrderSection = !!portfolioId && ['Buy', 'Sell'].includes(transactionType);
  const showWalletSection = ['Buy', 'Input', 'Earning', 'Sell', 'Output', 'TransferIn'].includes(transactionType);
  const showPriceSection = ['Buy', 'Sell'].includes(transactionType);
  const showAmountField = ['Buy', 'Sell'].includes(transactionType);

  useEffect(() => {
    const price = tickerPrice(asset.tickerId) / tickerPrice(selectedTicker);
    form.setFieldValue('price', price || '');
  }, [selectedTicker]);

  const handleSubmit = async (values) => {
    const submitData = {
      ...values,
      // Добавляем ID если редактируем
      ...(transaction && { id: transaction.id }),
      assetId: asset?.id,
      tickerId: asset?.tickerId,
      priceUsd: form.getFieldValue('price') * tickerPrice(selectedTicker),
      portfolioId: portfolioId,
      // walletId: asset?.walletId,
    };
    console.log(submitData)

    const result = await editTransaction(submitData);

    if (result.success) {
      message.success(transaction ? 'Транзакция обновлена' : 'Транзакция добавлена');
      closeModal();
    } else {
      message.error(result.error || 'Произошла ошибка');
    }
  };

  const handleCancel = () => {
    form.resetFields();
    closeModal();
  };

  const handlePasteMax = () => {
    const freeAmount = portfolioId ? Math.min(asset?.free || 0, walletFreeAmount) : walletFreeAmount;
    form.setFieldValue('quantity', freeAmount);
    handleQuantityChange(freeAmount)
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
        <Space direction="vertical" style={{ width: '100%' }} size="0">
          {/* Тип транзакции */}
          <Form.Item name="type">
            <Radio.Group 
              optionType="button" 
              buttonStyle="solid"
              style={{ width: '100%' }}
              onChange={handleTypeChange}
            >
              <div>
                {availableTypes.map(type => (
                  <Radio.Button key={type.value} value={type.value} >
                    {type.label}
                  </Radio.Button>
                ))}
              </div>
            </Radio.Group>
          </Form.Item>

          {/* Ордер */}
          {showOrderSection && (
            <Form.Item name="order" valuePropName="checked">
              <Checkbox>Ордер</Checkbox>
            </Form.Item>
          )}

          {/* Кошелек */}
          {showWalletSection && (
            <Form.Item 
              label="Кошелек" 
              name="wallet_id"
              initialValue={selectedWalletId}
              rules={[{ required: true, message: 'Выберите кошелек' }]}
            >
              <Select 
                placeholder="-"
                suffixIcon={<ChevronDownIcon />}
                loading={walletsLoading}
                onChange={handleWalletChange}
                optionLabelProp="label"
              >
                {wallets.map(wallet => (
                  <Option
                    key={wallet.id}
                    value={wallet.id}
                    label={wallet.name}
                  >
                    {wallet.name}
                    {isSellType && (
                      <span style={{ marginLeft: '0.5rem', fontWeight: 300 }}>({wallet.free} {tickerSymbol(asset.tickerId)})</span>
                    )}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {/* Портфель (для переводов) */}
          {['TransferIn', 'TransferOut'].includes(transactionType) && portfolioId && (
            <Form.Item 
              label="Портфель" 
              name="portfolio2Id"
              rules={[{ required: true, message: 'Выберите портфель' }]}
            >
              <Select 
                placeholder="-"
                suffixIcon={<ChevronDownIcon />}
              >
                {portfolios
                  .filter(portfolio => portfolio.id !== portfolioId)
                  .map(portfolio => (
                  <Option
                    key={portfolio.id}
                    value={portfolio.id}
                    label={portfolio.name}
                  >
                    {portfolio.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {/* Цена */}
          {showPriceSection && (
            <Form.Item label="Цена">
              <Input.Group compact>
                <Form.Item 
                  name="ticker2_id"
                  noStyle
                  initialValue={selectedTicker}
                  rules={[{ required: true, message: 'Выберите валюту' }]}
                >
                  <Select 
                    // style={{ width: '30%' }}
                    showSearch
                    popupMatchSelectWidth={false}
                    suffixIcon={<ChevronDownIcon />}
                    placeholder="Валюта"
                    addonBefore={selectedTicker ? selectedTicker : <span>—</span>}
                    optionLabelProp="label"
                    loading={assetsLoading}
                    onChange={handleTickerChange}
                    disabled={!selectedWalletId || walletAssets.length === 0}
                  >
                    {walletAssets.map(asset => (
                      <Option key={asset.id} value={asset.tickerId} label={tickerSymbol(asset.tickerId)} >
                        {tickerSymbol(asset.tickerId)}
                        <span style={{ marginLeft: '0.5rem', fontWeight: 300 }}>{asset.free}</span>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item 
                  name="price"
                  noStyle
                  rules={[{ required: true, message: 'Введите цену' }]}
                >
                  <InputNumber
                    // style={{ width: '70%' }}
                    placeholder="0.00"
                    onChange={handlePriceChange}
                    step="0.01"
                    min="0"
                    precision={2}
                    disabled={!selectedWalletId}
                  />
                </Form.Item>
              </Input.Group>
            </Form.Item>
          )}

          {/* Количество */}
          <Form.Item style={{ width: '100%' }}
            extra={
              <div style={{ fontSize: '12px' }}>
                {/* Информация о доступном количестве */}
                {isSellType && portfolioId && (
                  <span style={{ color: asset?.free > 0 ? 'inherit' : 'red', marginRight: '8px' }}>
                    В портфеле: {asset?.free || 0}
                  </span>
                )}

                {isSellType && selectedWalletId && (
                  <div style={{ fontSize: '12px', color: walletFreeAmount > 0 ? 'inherit' : 'red' }}>
                    В кошельке: {walletFreeAmount} {transaction?.base_ticker?.symbol}
                  </div>
                )}
                {isSellType && asset?.free > 0 && (
                  <Button type="link" size="small" onClick={handlePasteMax} style={{ padding: 0, height: 'auto' }}>
                    MAX
                  </Button>
                )}
              </div>
            }
            label={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <span>Количество</span>
              </div>
            }
            name="quantity"
            rules={[{ required: true, message: 'Введите количество' }]}
          >
            <InputNumber
              addonBefore={tickerSymbol(transaction?.tickerId || asset.tickerId)}
              placeholder="0.00"
              step="0.00001"
              min="0.00001"
              precision={5}
              style={{ width: '100%' }}
              disabled={calculationType !== 'quantity' && showAmountField}
              onChange={handleQuantityChange}
            />
          </Form.Item>

          {/* Сумма транзакции */}
          {showAmountField && (
            <Form.Item
              label={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Сумма транзакции</span>
                  <Button 
                    type="link" 
                    size="small" 
                    onClick={toggleCalculationType}
                    style={{ padding: 0, height: 'auto' }}
                  >
                    ↕
                  </Button>
                </div>
              }
              name="quantity2"
              rules={[{ required: true, message: 'Введите сумму' }]}
            >
              <InputNumber
                addonBefore={selectedTicker ? tickerSymbol(selectedTicker) : <span>—</span>}
                placeholder="0.00"
                step="0.01"
                min="0.01"
                precision={2}
                style={{ width: '100%' }}
                disabled={calculationType !== 'amount'}
                onChange={handleAmountChange}
              />
            </Form.Item>
          )}

          {/* Дата */}
          <Form.Item label="Дата" name="date"
            rules={[{ required: true, message: 'Введите дату' }]}
          >
            <Input type="datetime-local" />
          </Form.Item>

          {/* Кнопка "Еще" */}
          <Button 
            type="link" 
            icon={showMore ? <MinusOutlined /> : <PlusOutlined />}
            onClick={toggleShowMore}
            style={{ padding: 0, height: 'auto' }}
          >
            {showMore ? 'Скрыть' : 'Еще'}
          </Button>

          {/* Комментарий */}
          {showMore && (
            <Form.Item
              label="Комментарий"
              name="comment"
              rules={[{ max: 500, message: 'Максимум 500 символов' }]}
            >
              <TextArea
                placeholder="Дополнительная информация о транзакции..."
                rows={3}
                showCount
                maxLength={500}
              />
            </Form.Item>
          )}

          {/* Кнопки действий */}
          <Form.Item style={{ marginBottom: 0 }}>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={handleCancel}>Отмена</Button>
              <Button 
                type="primary" 
                htmlType="submit" 
                // loading={loading}
                disabled={isSellType && asset?.free <= 0}
              >
                {transaction ? 'Сохранить' : 'Добавить'}
              </Button>
            </Space>
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};

export default TransactionEdit;
