import React from 'react';
import { act, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../utils/test-utils';
import stateStub from '../proxies/stateProxy';

import Details from '../../components/ProductDetails/Details';

test('products details render', async () => {
  renderWithProviders(<Details handleScroll={() => console.log('testScroll')}/>, {
    preloadedState: {
      products: stateStub.products,
      reviews: stateStub.reviews,
    },
  });
  // screen.debug();

  // Check that loading state is not displayed
  // expect(screen.queryByText('Loading...')).toBeNull();
  expect(screen.getByText(stateStub.products.selectedStyle.name)).toBeInTheDocument();
  // expect(screen.getByText('Some other string')).toBeInTheDocument();
});

test('the select size dropdown renders out of stock when no items in stock', async () => {
  renderWithProviders(<Details />, {
    preloadedState: {
      products: stateStub.products,
      reviews: stateStub.reviews,
    },
  });
  // screen.debug();

  // Check that loading state is not displayed
  // expect(screen.queryByText('Loading...')).toBeNull();
  expect(screen.getByText('Out Of Stock')).toBeInTheDocument();
  // expect(screen.getByText('Some other string')).toBeInTheDocument();
});
