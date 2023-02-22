import { useQuery } from '@apollo/client';
import React from 'react';

import { GET_RECENT_TRANSACTIONS } from '../queries/uniswapQueries';
import { Spinner, TransactionRow } from './index';

export const Transactions = () => {
  const { loading, error, data } = useQuery(GET_RECENT_TRANSACTIONS);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong :(</p>;

  return (
    <>
      <h1>Transactions</h1>
      {!loading && !error && (
        <table className={'table table-hover mt-3'}>
          <thead>
            <tr>
              <th>Time</th>
              <th>Token Pair</th>
              <th>Token0 Delta</th>
              <th>Token1 Delta</th>
              <th>Total Value</th>
              <th>Sender</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            {data.swaps.map((transactions: any) => (
              <TransactionRow key={transactions.id} transaction={transactions} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
