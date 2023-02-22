import React from 'react';

// @ts-ignore
export const PoolRow = ({ pool }) => {
  const totalValueLocked = (pool.totalValueLockedUSD / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const lastArr = pool.poolDayData.length - 1;

  const tvl24Hour = (pool.poolDayData[lastArr].tvlUSD / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const date = new Date(pool.poolDayData[0].date * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <tr>
      <td>{pool.id}</td>
      <td>{pool.token0.name}</td>
      <td>{pool.token1.name}</td>
      <td>{totalValueLocked}</td>
      <td>{date}</td>
      <td>{tvl24Hour}</td>
    </tr>
  );
};
