import React from 'react';

import { Tokens, Transactions } from '../components';
import { Pools } from '../components/Pools';

const handleRefresh = () => {
  window.location.reload();
};
export const Home = () => {
  return (
    <>
      <div className={'d-flex gap-3 mb-4'}>
        <button className={'btn btn-primary'} onClick={handleRefresh}>
          Click to Reset
        </button>
      </div>
      <Pools />
      <hr />
      <Tokens />
      <hr />
      <Transactions />
    </>
  );
};
