import React from 'react';
import { Link } from 'react-router-dom';

import { calculateTime, formatCurrency } from '../utils/currency.utils';

export const TransactionRow = ({ transaction }: any) => {
  const token0Delta = formatCurrency(transaction.amount0);
  const token1Delta = formatCurrency(transaction.amount1);
  const totalAmount = formatCurrency(transaction.amountUSD);

  return (
    <tr>
      <td>{calculateTime(transaction.timestamp)}</td>
      <td>{`${transaction.token0.symbol}/${transaction.token1.symbol}`}</td>
      <td>{token0Delta}</td>
      <td>{token1Delta}</td>
      <td>{totalAmount}</td>
      <td>{transaction.sender}</td>
      <td>
        <Link to={`https://etherscan.io/address/${transaction.sender}`}>Etherscan</Link>
      </td>
    </tr>
  );
};
