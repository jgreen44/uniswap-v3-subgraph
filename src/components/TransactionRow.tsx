import React from 'react';
import { Link } from 'react-router-dom';

function getTimeFromSeconds(seconds: number) {
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;

  if (seconds < minute) {
    return seconds + (seconds === 1 ? ' second ago' : ' seconds ago');
  } else if (seconds < hour) {
    const minutes = Math.floor(seconds / minute);
    return minutes + (minutes === 1 ? ' minute ago' : ' minutes ago');
  } else if (seconds < day) {
    const hours = Math.floor(seconds / hour);
    return hours + (hours === 1 ? ' hour ago' : ' hours ago');
  } else if (seconds < week) {
    const days = Math.floor(seconds / day);
    return days + (days === 1 ? ' day ago' : ' days ago');
  } else {
    const weeks = Math.floor(seconds / week);
    return weeks + (weeks === 1 ? ' week ago' : ' weeks ago');
  }
}
export const TransactionRow = ({ transaction }: any) => {
  const now = Date.now();
  const timestamp = transaction.timestamp * 1000;
  const diff = now - timestamp;
  const diffSeconds = Math.floor(diff / 1000);
  const timeFromNow = getTimeFromSeconds(diffSeconds);

  const token0Delta = (transaction.amount0 / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const token1Delta = (transaction.amount1 / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const totalAmount = (transaction.amountUSD / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <tr>
      <td>{timeFromNow}</td>
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
