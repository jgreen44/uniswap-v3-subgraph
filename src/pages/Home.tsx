import React from 'react';

import { Tokens, Transactions } from '../components';
import { Pools } from '../components/Pools';

export const Home = () => {
  return (
    <>
      <div className={'d-flex gap-3 mb-4'}>
        <button className={'btn btn-primary'}>Add Liquidity</button>
      </div>
      <Pools />
      <hr />
      <Tokens />
      <hr />
      <Transactions />
    </>
  );
};
