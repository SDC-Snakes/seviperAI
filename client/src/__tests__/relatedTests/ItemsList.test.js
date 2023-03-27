import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import FormatCard from '../../components/RelatedItems/FormatCard';
import Dropdown from '../../components/ReviewsRatings/SortReviews';
import { renderWithProviders } from '../utils/test-utils';
import stateStub from '../proxies/stateProxy';

test('renders Dropdown from Reviews to the page', () => {
  render(<Dropdown />);
  expect(screen.getByText('newest')).toBeInTheDocument();
});

test('renders a product\'s information to its card', () => {
  renderWithProviders(<FormatCard />, {
    preloadedState: {
      products: stateStub.products,
    },
  });
});
