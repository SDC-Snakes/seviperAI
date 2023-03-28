import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../utils/test-utils';
import stateStub from '../proxies/stateProxy';
import getProductStub from '../proxies/getProductProxy';
import getProductStylesStub from '../proxies/getProductStylesProxy';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ImageViewer from '../../components/ProductDetails/ImageViewer';

test('Arrows and expand button dissappear after entering zoom view', async () => {
  renderWithProviders(
    <Router>
      <ImageViewer />
    </Router>,
    {
      preloadedState: {
        products: stateStub.products,
        reviews: stateStub.reviews,
      },
    },
  );
  let chevrons = await screen.findAllByTestId('chevron-icon');
  expect(chevrons).toHaveLength(3);
  expect(await screen.findByTestId('expandBtn')).toBeInTheDocument();

  await userEvent.click(screen.getByTestId('expandBtn'));
  await userEvent.click(screen.getByLabelText('image-window'));

  chevrons = screen.queryAllByTestId('chevron-icon');
  expect(screen.queryByTestId('expandBtn')).toBeNull();
  expect(chevrons).toHaveLength(0);
});

test('the image displayed changes when sidebar image is clicked', async () => {
  renderWithProviders(
    <Router>
      <ImageViewer />
    </Router>,
    {
      preloadedState: {
        products: stateStub.products,
        reviews: stateStub.reviews,
      },
    },
  );

  expect(screen.getByRole('img', { name: 'main-image' })).toHaveAttribute('src', 'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80');

  const sideImages = await screen.findAllByRole('button', { name: 'side-img' });

  await userEvent.click(sideImages[0]);
  expect(await screen.findByRole('img', { name: 'main-image' })).toHaveAttribute('src', 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80');
});

test('the images displayed in the sidebar change when down arrow is clicked', async () => {
  renderWithProviders(
    <Router>
      <ImageViewer />
    </Router>,
    {
      preloadedState: {
        products: stateStub.products,
        reviews: stateStub.reviews,
      },
    },
  );

  let sideImages = await screen.findAllByRole('button', { name: 'side-img' });
  expect(sideImages).toHaveLength(7);

  await userEvent.click(screen.getByLabelText('down-arrow'));

  sideImages = screen.getAllByRole('button', { name: 'side-img' });
  expect(sideImages).toHaveLength(1);
});

test('clicking left and right arrows cycle images', async () => {
  renderWithProviders(
    <Router>
      <ImageViewer />
    </Router>,
    {
      preloadedState: {
        products: stateStub.products,
        reviews: stateStub.reviews,
      },
    },
  );

  expect(screen.getByRole('img', { name: 'main-image' })).toHaveAttribute('src', 'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80');

  await userEvent.click(screen.getByLabelText('right-arrow'));

  expect(screen.getByRole('img', { name: 'main-image' })).toHaveAttribute('src', 'https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80');

  await userEvent.click(screen.getByLabelText('left-arrow'));

  expect(screen.getByRole('img', { name: 'main-image' })).toHaveAttribute('src', 'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80');
});
