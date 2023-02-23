import { render } from '@testing-library/react';
import React from 'react';

import { Header } from '../index';

describe('Header', () => {
  it('renders the logo and title', () => {
    const { getByText, getByAltText } = render(<Header />);
    const logo = getByAltText('logo');
    const title = getByText('Uniswap V3 SubGraph');
    expect(logo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
