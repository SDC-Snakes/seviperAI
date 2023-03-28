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

  expect(screen.getByText(stateStub.products.selectedStyle.name)).toBeInTheDocument();
});

test('the select size dropdown renders out of stock when no items in stock', async () => {
  renderWithProviders(<Details />, {
    preloadedState: {
      products: stateStub.products,
      reviews: stateStub.reviews,
    },
  });

  expect(screen.getByText('Out Of Stock')).toBeInTheDocument();
});

test('the select size dropdown renders size options when the item is in stock', async () => {
  renderWithProviders(<Details />, {
    preloadedState: {
      products: stateStub.products,
      reviews: stateStub.reviews,
    },
  });

  expect(await screen.findByText(stateStub.products.selectedStyle.name)).toBeInTheDocument();
  const styleImages = screen.getAllByRole('button', { name: 'style-image' });
  await userEvent.click(styleImages[1]);
  expect(await screen.findByText(stateStub.products.styles[1].name)).toBeInTheDocument();
  screen.logTestingPlaygroundURL();

  // expect(screen.queryByText('Out Of Stock')).toBeNull();
  expect(await screen.findByText('Select Size')).toBeInTheDocument();
});
