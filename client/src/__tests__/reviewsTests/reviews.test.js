import React from 'react';
import { act, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { renderWithProviders } from '../utils/test-utils';
import stateStub from '../proxies/stateProxy';
import reviewsStub from '../proxies/getReviewsProxy';
import reviewsMetaStub from '../proxies/getReviewsMetaProxy';
import ReviewsAndRatings from '../../components/ReviewsRatings/ReviewsAndRatings';

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  rest.get('/reviews/:productId', (req, res, ctx) => res(
    ctx.json(reviewsStub),
    ctx.delay(150),
  )),
  rest.get('/reviews/meta/:productId', (req, res, ctx) => res(
    ctx.json(reviewsMetaStub),
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

test('reviews render after making a call to the API', async () => {
  renderWithProviders(
    <Router>
      <ReviewsAndRatings />
    </Router>,
    {
      preloadedState: {
        products: stateStub.products,
        reviews: stateStub.reviews,
      },
    },
  );
  // screen.debug();

  expect(await screen.findByText("Product Reviews")).toBeInTheDocument();
  expect(await screen.findByText("Product Ratings")).toBeInTheDocument();

});

// Simulate clicking expand and ensure product details no longer display.
