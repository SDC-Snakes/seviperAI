import React from 'react';
import { act, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderWithProviders } from './utils/test-utils';
import stateStub from './proxies/stateProxy';

import Search from '../subComponents/Search';

// eslint-disable-next-line import/prefer-default-export
// export const handlers = [
//   rest.get('/products', (req, res, ctx) => res(ctx.json('John Smith'), ctx.delay(150))),
// ];

// const server = setupServer(...handlers);

// // Enable API mocking before tests.
// beforeAll(() => server.listen());

// // Reset any runtime request handlers we may add during the tests.
// afterEach(() => server.resetHandlers());

// // Disable API mocking after the tests are done.
// afterAll(() => server.close());

test('Search bar renders', async () => {
  renderWithProviders(<Search />, {
    preloadedState: {
    },
  });
  // screen.debug();

  // Check that loading state is not displayed
  // expect(screen.queryByText('Loading...')).toBeNull();
  expect(screen.getByText('SEARCH DIV')).toBeInTheDocument();
  // expect(screen.getByText('Some other string')).toBeInTheDocument();
});
