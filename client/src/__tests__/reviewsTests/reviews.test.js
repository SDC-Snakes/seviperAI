import React from 'react';
import { act, screen, fireEvent } from '@testing-library/react';
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
  rest.get('/reviews', (req, res, ctx) => res(
    ctx.json(reviewsStub.reviews),
    ctx.delay(150),
  )),
  rest.get('/reviews/meta', (req, res, ctx) => res(
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
        reviews: reviewsStub,
      },
    },
  );
  // screen.debug();

  expect(await screen.findByText("Product Reviews")).toBeInTheDocument();
  expect(await screen.findByText("Product Ratings")).toBeInTheDocument();
  expect(await screen.findByText("Rating Breakdown")).toBeInTheDocument();
  expect(await screen.queryAllByText("Report")[0]).toBeInTheDocument();
  const addAReview = await screen.findByRole('button', {name:'Add a review'})
  fireEvent.click(addAReview)
  expect(await screen.findByText("Write Your Review")).toBeInTheDocument();
  expect(await screen.findByText("Overall rating")).toBeInTheDocument();
  expect(await screen.findByText("Do you recommend this product?")).toBeInTheDocument();
  expect(await screen.findByText("For authentication reasons, you will not be emailed")).toBeInTheDocument();
  expect(await screen.findByText("Your email")).toBeInTheDocument();
  // add images
  const addImages = await screen.findByRole('button', {name:'Add images'})
  fireEvent.click(addImages)
  expect(await screen.findByText("Add images to your review!")).toBeInTheDocument();
  expect(await screen.findByText("Drag 'n' drop some files here, or click to select files")).toBeInTheDocument();

// sort drop down list
  const option = screen.getByRole('option', { name: 'relevant' });
  expect(option).toBeInTheDocument();

  const helpful = screen.getByRole('option', { name: 'helpful' });
  expect(helpful).toBeInTheDocument();

  const newest = screen.getByRole('option', { name: 'newest' });
  expect(newest).toBeInTheDocument();

// radio buttons
  const radio1 = screen.getByRole('radio', { name: 'Yes' });
  expect(radio1).toBeInTheDocument();

  const radio2 = screen.getByRole('radio', { name: 'No' });
  expect(radio2).toBeInTheDocument();

  const Poor = screen.getByRole('radio', { name: 'Poor' });
  expect(Poor).toBeInTheDocument();

  const expected = screen.getByRole('radio', { name: 'What I expected' });
  expect(expected).toBeInTheDocument();

  const tight = screen.getByRole('radio', { name: 'Runs tight' });
  expect(tight).toBeInTheDocument();



});


