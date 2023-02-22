import { gql } from '@apollo/client';

export const CURRENT_GLOBAL_DATA = gql`
  query currentGlobalData {
    factory(id: "0x1F98431c8aD98523631AE4a59f267346ea31F984") {
      poolCount
      txCount
      totalVolumeUSD
      totalVolumeETH
      totalValueLockedUSD
      totalValueLockedETH
    }
  }
`;

export const TOP_POOLS_TVL = gql`
  query topPoolsTVL {
    pools(first: 10, orderBy: totalValueLockedUSD, orderDirection: desc) {
      id
      token0 {
        id
        symbol
        name
      }
      token1 {
        id
        symbol
        name
      }
      poolDayData {
        id
        date
        tvlUSD
      }
      totalValueLockedUSD
      totalValueLockedETH
    }
  }
`;

export const GET_TOKENS = gql`
  query tokens {
    tokens(first: 10, orderBy: totalValueLockedUSD, orderDirection: desc) {
      id
      name
      symbol
      totalValueLockedUSD
      derivedETH
    }
  }
`;

export const GET_TOKEN_DAY_DATA = gql`
  query GetTokenDayData($id: String!) {
    tokenDayDatas(first: 10, where: { token: $id }, orderBy: date, orderDirection: desc) {
      id
      date
      priceUSD
    }
  }
`;

export const GET_RECENT_TRANSACTIONS = gql`
  query getRecentTransactions {
    swaps(first: 10, orderBy: timestamp, orderDirection: desc) {
      id
      timestamp
      amount0
      amount1
      amountUSD
      token0 {
        id
        symbol
      }
      token1 {
        id
        symbol
      }
      sender
      origin
    }
  }
`;
