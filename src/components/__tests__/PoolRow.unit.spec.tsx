import { render } from '@testing-library/react';
import React from 'react';

import * as calculationsUtils from '../../utils/calculations.utils';
import { PoolRow } from '../index';

jest.mock('../../utils/calculations.utils', () => ({
  ...jest.requireActual('../../utils/calculations.utils'),
  lastArr: jest.fn(),
  formatCurrency: jest.fn(),
  calculateDate: jest.fn(),
}));

const pool = {
  id: 1,
  token0: { name: 'Token 0' },
  token1: { name: 'Token 1' },
  totalValueLockedUSD: 1000,
  poolDayData: [{ date: '2022-02-22', tvlUSD: 500 }],
};

describe('PoolRow', () => {
  it('renders the pool information', () => {
    const mockLastArr = calculationsUtils.lastArr as jest.Mock;
    const mockFormatCurrency = calculationsUtils.formatCurrency as jest.Mock;
    const mockCalculateDate = calculationsUtils.calculateDate as jest.Mock;

    mockLastArr.mockReturnValue(0);
    mockFormatCurrency.mockReturnValue('$1,000.00');
    mockCalculateDate.mockReturnValue('February 22, 2022');

    const { getByText } = render(<PoolRow pool={pool} />);
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('Token 0')).toBeInTheDocument();
    expect(getByText('Token 1')).toBeInTheDocument();
    expect(getByText('$1,000.00')).toBeInTheDocument();
    expect(getByText('February 22, 2022')).toBeInTheDocument();
    expect(getByText('$500.00')).toBeInTheDocument();
    expect(mockLastArr).toHaveBeenCalledWith(pool.poolDayData);
    expect(mockFormatCurrency).toHaveBeenCalledTimes(2);
    expect(mockFormatCurrency).toHaveBeenCalledWith(pool.totalValueLockedUSD);
    expect(mockFormatCurrency).toHaveBeenCalledWith(pool.poolDayData[0].tvlUSD);
    expect(mockCalculateDate).toHaveBeenCalledWith(pool.poolDayData[0].date);
  });
});
