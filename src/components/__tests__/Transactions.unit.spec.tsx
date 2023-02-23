import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';
import React from 'react';

import { GET_RECENT_TRANSACTIONS } from '../../queries/uniswapQueries';
import { Transactions } from '../Transactions';

const mocks = [
  {
    request: {
      query: GET_RECENT_TRANSACTIONS,
    },
    result: {
      data: {
        swaps: [
          {
            id: '1',
            timestamp: '2022-02-22T09:43:14Z',
            amount0: '100',
            amount1: '0',
            sender: '0x123',
            to: '0x456',
            token0: {
              id: 'token0',
              symbol: 'T0',
            },
            token1: {
              id: 'token1',
              symbol: 'T1',
            },
          },
        ],
      },
    },
  },
];

describe('Transactions component', () => {
  it('should render loading spinner when loading', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Transactions />
      </MockedProvider>,
    );

    expect(getByTestId('spinner')).toBeInTheDocument();
    await waitFor(() => expect(getByTestId('spinner')).not.toBeInTheDocument());
  });

  it('should render error message on error', async () => {
    const errorMessage = 'Something Went Wrong :(';
    const { getByText } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Transactions />
      </MockedProvider>,
    );

    await waitFor(() => expect(getByText(errorMessage)).toBeInTheDocument());
  });

  it('should render transaction rows when data is loaded', async () => {
    const { getAllByRole } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Transactions />
      </MockedProvider>,
    );

    await waitFor(() => expect(getAllByRole('row').length).toBeGreaterThan(0));
    expect(getAllByRole('row')[1]).toHaveTextContent('T0/T1');
    expect(getAllByRole('row')[1]).toHaveTextContent('0.5');
  });
});
