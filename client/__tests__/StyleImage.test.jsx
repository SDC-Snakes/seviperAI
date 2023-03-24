import React from 'react';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './utils/productDetails-utils';

import StyleImage from '../src/components/ProductDetails/Details';
import proxyProduct from './proxies/proxyProduct';
import { useGetProductInfoQuery } from '../src/features/api/apiSlice';
import stateStub from './proxies/stateStub';

jest.mock('../src/features/api/apiSlice');

test('products details render', async () => {
  renderWithProviders(<StyleImage image="https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80" />, { preloadedState: stateStub });
  screen.debug();

  // Check that loading state is not displayed
  // expect(screen.queryByText('Loading...')).toBeNull();
  expect(screen.getByText('Add to cart')).toBeInTheDocument();
});
