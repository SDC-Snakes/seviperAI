import React from 'react';
import { act, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../utils/test-utils';
import stateStub from '../proxies/stateProxy';
import getProductStub from '../proxies/getProductProxy';
import getProductStylesStub from '../proxies/getProductStylesProxy';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProductDetails from '../../components/ProductDetails/ProductDetails';

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  rest.get('/products/:productId', (req, res, ctx) => res(
    ctx.json(getProductStub),
    ctx.delay(150),
  )),
  rest.get('/products/:productId/styles', (req, res, ctx) => res(
    ctx.json(getProductStylesStub),
    ctx.delay(150),
  )),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test('products details render after making a call to the API', async () => {
  renderWithProviders(
    <Router>
      <ProductDetails handleScroll={() => console.log('testScroll')} />
    </Router>,
    {
      preloadedState: {
        products: stateStub.products,
        reviews: stateStub.reviews,
      },
    },
  );
  // screen.debug();

  expect(await screen.findByText(stateStub.products.selectedStyle.name)).toBeInTheDocument();

  // Check that loading state is not displayed
  // expect(screen.queryByText('Loading...')).toBeNull();
  // expect(screen.getByText(stateStub.products.selectedStyle.name)).toBeInTheDocument();
  // expect(screen.getByText('Some other string')).toBeInTheDocument();
});

// Simulate clicking expand and ensure product details no longer display.
