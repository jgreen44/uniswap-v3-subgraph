import React from 'react';

import { calculateDate, lastArr } from '../utils/calculations.utils';

export const PoolRow = ({ pool }: any) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const position = lastArr(pool.poolDayData);
  const tvl24HourAmount = pool.poolDayData[position].tvlUSD;
  const tvlUSD = pool.totalValueLockedUSD;
  const date = calculateDate(pool.poolDayData[0].date);

  const tvl24Hour = formatter.format(tvl24HourAmount);
  const totalValueLocked = formatter.format(tvlUSD);

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
