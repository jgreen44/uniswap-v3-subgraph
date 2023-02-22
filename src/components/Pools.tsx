import { useQuery } from '@apollo/client';
import React from 'react';

import { TOP_POOLS_TVL } from '../queries/uniswapQueries';
import { PoolRow, Spinner } from './index';

export const Pools = () => {
  const { loading, error, data } = useQuery(TOP_POOLS_TVL);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong :(</p>;
  return (
    <>
      <h1>Top Pools</h1>
      {!loading && !error && (
        <table className={'table table-hover mt-3'}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Token 0</th>
              <th>Token 1</th>
              <th>TVL</th>
              <th>Date</th>
              <th>24h Volume</th>
            </tr>
          </thead>
          <tbody>
            {data.pools.map((pools: any) => (
              <PoolRow key={pools.id} pool={pools} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
