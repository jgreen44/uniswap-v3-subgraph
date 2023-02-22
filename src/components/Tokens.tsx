import { useQuery } from '@apollo/client';
import React from 'react';

import { GET_TOKENS } from '../queries/uniswapQueries';
import { Spinner, TokenRow } from './index';

export const Tokens = () => {
  const { loading, error, data } = useQuery(GET_TOKENS);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong :(</p>;

  return (
    <>
      <h1>Tokens</h1>
      {!loading && !error && (
        <table className={'table table-hover mt-3'}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price Point</th>
              <th>Price Change</th>
              <th>TVL</th>
            </tr>
          </thead>
          <tbody>
            {data.tokens.map((tokens: any) => (
              <TokenRow key={tokens.id} token={tokens} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
