import { useQuery } from '@apollo/client';
import { render, waitFor } from '@testing-library/react';
import React from 'react';

import { TokenRow } from '../TokenRow';

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  gql: jest.fn(),
}));

jest.mock('../Spinner', () => ({
  Spinner: () => <div data-testid="spinner">Loading...</div>,
}));

describe('TokenRow', () => {
  const token = {
    id: 1,
    name: 'Token',
    symbol: 'TKN',
    derivedETH: 0.1,
    totalValueLockedUSD: 1000,
  };

  const data = {
    tokenDayDatas: [
      { date: '2022-02-22', priceUSD: 2 },
      { date: '2022-02-21', priceUSD: 1 },
    ],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading spinner when data is loading', () => {
    (useQuery as jest.Mock).mockReturnValue({ loading: true });

    const { getByTestId } = render(<TokenRow token={token} />);

    expect(getByTestId('spinner')).toBeInTheDocument();
  });

  it('displays error message when there is an error fetching data', async () => {
    (useQuery as jest.Mock).mockReturnValue({ error: new Error('Something Went Wrong :(') });

    const { getByText } = render(<TokenRow token={token} />);

    await waitFor(() => expect(getByText('Something Went Wrong :(')).toBeInTheDocument());
  });

  it('displays token data when data is loaded', async () => {
    (useQuery as jest.Mock).mockReturnValue({ data });

    const { getByText } = render(<TokenRow token={token} />);

    await waitFor(() => expect(getByText('Token')).toBeInTheDocument());
    expect(getByText('TKN')).toBeInTheDocument();
    expect(getByText('0.1')).toBeInTheDocument();
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('$10.00')).toBeInTheDocument();
  });
});
