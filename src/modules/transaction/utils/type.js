import { TYPE_OPPOSITE_MAP, TYPE_NAME_MAP } from '/app/src/modules/transaction/constants/transactionTypes';

export const isOutgoingTransaction = (type) => 
    ['Sell', 'Output', 'TransferOut'].includes(type);
  
export const isTradeTransaction = (type) => 
  ['Buy', 'Sell'].includes(type);

export const isTransferTransaction = (type) => 
  ['TransferIn', 'TransferOut'].includes(type);

export const getTransactionTypeColor = (type) => 
    isOutgoingTransaction(type) ? 'text-red' : 'text-green';

export const getAdjustedTransactionType = (transaction, isCounterTransaction) => {
  // Переворачиваем название при необходимости
  return isCounterTransaction(transaction) ? TYPE_OPPOSITE_MAP[transaction.type] : transaction.type;
};

export const getTransactionTypeLabel = (transaction, isCounterTransaction, getTicker) => {
  let label = '';
  if (isTradeTransaction(transaction.type)) {
    label = TYPE_NAME_MAP[transaction.type];
  } else if (isTransferTransaction(transaction.type)) {
    label = TYPE_NAME_MAP[getAdjustedTransactionType(transaction, isCounterTransaction)];
  } else {
    label = TYPE_NAME_MAP[transaction.type];
  }

  if (isCounterTransaction(transaction) && isTradeTransaction(transaction.type)) {
    label += ' ' + getTicker(transaction.tickerId);
  }
  return label;
};
