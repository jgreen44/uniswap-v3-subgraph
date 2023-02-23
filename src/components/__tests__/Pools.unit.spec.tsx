import { useQuery } from '@apollo/client';
import { render, waitFor } from '@testing-library/react';
import React from 'react';

import { Pools } from '../Pools';

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  gql: jest.fn(),
}));

jest.mock('../Spinner', () => ({
  Spinner: () => <div data-testid="spinner">Loading...</div>,
}));

jest.mock('../PoolRow', () => ({
  PoolRow: () => <div data-testid="pool-row">Pool Row</div>,
}));

describe('Pools', () => {
  const data = {
    pools: [
      {
        id: 1,
        token0: { name: 'Token0' },
        token1: { name: 'Token1' },
        totalValueLockedUSD: 1000,
        poolDayData: [
          { date: '2022-02-22', tvlUSD: 500 },
          { date: '2022-02-21', tvlUSD: 400 },
        ],
      },
    ],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading spinner when data is loading', () => {
    (useQuery as jest.Mock).mockReturnValue({ loading: true });

    const { getByTestId } = render(<Pools />);

    expect(getByTestId('spinner')).toBeInTheDocument();
  });

  it('displays error message when there is an error fetching data', async () => {
    (useQuery as jest.Mock).mockReturnValue({ error: new Error('Something Went Wrong :(') });

    const { getByText } = render(<Pools />);

    await waitFor(() => expect(getByText('Something Went Wrong :(')).toBeInTheDocument());
  });

  it('displays pool data when data is loaded', async () => {
    (useQuery as jest.Mock).mockReturnValue({ data });

    const { getByText } = render(<Pools />);

    await waitFor(() => expect(getByText('Top Pools')).toBeInTheDocument());
    expect(getByText('Token 0')).toBeInTheDocument();
    expect(getByText('Token 1')).toBeInTheDocument();
    expect(getByText('TVL')).toBeInTheDocument();
    expect(getByText('Date')).toBeInTheDocument();
    expect(getByText('24h Volume')).toBeInTheDocument();
  });
});
