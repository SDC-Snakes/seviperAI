import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormatCard from '../../components/RelatedItems/FormatCard';
import Dropdown from '../../components/ReviewsRatings/SortReviews';
import RelatedItems from '../../components/RelatedItems/RelatedItems';
import { renderWithProviders } from '../utils/test-utils';
import stateStub from '../proxies/stateProxy';

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

// test('renders Dropdown from Reviews to the page', () => {
//   render(<Dropdown />);
//   expect(screen.getByText('newest')).toBeInTheDocument();
// });

test('renders a product\'s information to its card', () => {
  renderWithProviders(<Router><FormatCard /></Router>, {
    preloadedState: {
      products: stateStub.products,
    },
  });
});
