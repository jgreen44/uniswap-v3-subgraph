import React from 'react';
import { Link } from 'react-router-dom';

import { calculateTime } from '../utils/calculations.utils';

export const TransactionRow = ({ transaction }: any) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const token0Delta = formatter.format(transaction.amount0);
  const token1Delta = formatter.format(transaction.amount1);
  const totalAmount = formatter.format(transaction.amountUSD);

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
