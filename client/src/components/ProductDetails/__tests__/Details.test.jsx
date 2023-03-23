import React from 'react';
import { act, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderWithProviders } from './utils/test-utils';
import stateStub from './proxies/stateProxy';

import Details from '../Details';

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  rest.get('/products', (req, res, ctx) => res(ctx.json('John Smith'), ctx.delay(150))),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test('products details render', async () => {
  renderWithProviders(<Details />, {
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
