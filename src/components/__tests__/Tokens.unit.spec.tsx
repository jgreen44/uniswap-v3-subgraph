import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';
import React from 'react';

import { GET_TOKENS } from '../../queries/uniswapQueries';
import { Tokens } from '../Tokens';

const mocks = [
  {
    request: {
      query: GET_TOKENS,
    },
    result: {
      data: {
        tokens: [
          {
            id: '1',
            name: 'Token 1',
            symbol: 'TOK1',
            derivedETH: 0.1,
            totalValueLockedUSD: 50000,
          },
          {
            id: '2',
            name: 'Token 2',
            symbol: 'TOK2',
            derivedETH: 0.2,
            totalValueLockedUSD: 100000,
          },
        ],
      },
    },
  },
];

describe('Tokens component', () => {
  it('renders tokens correctly', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Tokens />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(getByText('Name')).toBeInTheDocument();
      expect(getByText('Symbol')).toBeInTheDocument();
      expect(getByText('Price Point')).toBeInTheDocument();
      expect(getByText('Price Change')).toBeInTheDocument();
      expect(getByText('TVL')).toBeInTheDocument();
    });
  });
});
