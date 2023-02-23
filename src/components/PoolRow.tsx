import React from 'react';

import { calculateDate, formatCurrency, lastArr } from '../utils/calculations.utils';

// @ts-ignore
export const PoolRow = ({ pool }) => {
  const position = lastArr(pool.poolDayData);
  const totalValueLocked = formatCurrency(pool.totalValueLockedUSD);
  const tvl24Hour = formatCurrency(pool.poolDayData[position].tvlUSD);
  const date = calculateDate(pool.poolDayData[0].date);

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
