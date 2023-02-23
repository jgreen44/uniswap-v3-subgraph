import { render } from '@testing-library/react';
import React from 'react';

import { calculateDate, lastArr } from '../../utils/calculations.utils';
import { PoolRow } from '../index';

jest.mock('../../utils/calculations.utils', () => ({
  ...jest.requireActual('../../utils/calculations.utils'),
  lastArr: jest.fn(),
  calculateDate: jest.fn(),
  formatter: {
    format: jest.fn(),
  },
}));

describe('PoolRow', () => {
  const pool = {
    id: 1,
    token0: { name: 'Token0' },
    token1: { name: 'Token1' },
    totalValueLockedUSD: 1000,
    poolDayData: [
      { date: '2022-02-22', tvlUSD: 500 },
      { date: '2022-02-21', tvlUSD: 400 },
    ],
  };

  beforeEach(() => {
    (lastArr as jest.Mock).mockReturnValue(0);
    (calculateDate as jest.Mock).mockReturnValue('February 22, 2022');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders pool information correctly', () => {
    const { getByText } = render(<PoolRow pool={pool} />);

    expect(getByText(pool.id.toString())).toBeInTheDocument();
    expect(getByText(pool.token0.name)).toBeInTheDocument();
    expect(getByText(pool.token1.name)).toBeInTheDocument();
    expect(getByText('$1,000.00')).toBeInTheDocument();
    expect(getByText('February 22, 2022')).toBeInTheDocument();
    expect(getByText('$500.00')).toBeInTheDocument();
  });

  it('calls calculations.utils functions with correct arguments', () => {
    render(<PoolRow pool={pool} />);

    expect(lastArr).toHaveBeenCalledWith(pool.poolDayData);
    expect(calculateDate).toHaveBeenCalledWith(pool.poolDayData[0].date);
  });
});
