import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';

import { GET_TOKEN_DAY_DATA } from '../queries/uniswapQueries';
import { Spinner } from './index';

export const TokenRow = ({ token }: any) => {
  const [tokenId, setTokenId] = useState(null);
  const totalValueLocked = (token.totalValueLockedUSD / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  useEffect(() => {
    setTokenId(token.id);
  }, [token.id]);

  const { loading, error, data } = useQuery(GET_TOKEN_DAY_DATA, {
    variables: { id: tokenId },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong :(</p>;

  const lastArr = data.tokenDayDatas.length - 1;

  // Calculate price change for token
  const priceChange = data.tokenDayDatas[0].priceUSD - data.tokenDayDatas[lastArr].priceUSD;

  return (
    <tr>
      <td>{token.name}</td>
      <td>{token.symbol}</td>
      <td>{token.derivedETH}</td>
      <td>{priceChange}</td>
      <td>{totalValueLocked}</td>
    </tr>
  );
};
