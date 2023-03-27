import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import { BrowserRouter as Router } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import FormatCard from '../../components/RelatedItems/FormatCard';
import RelatedItems from '../../components/RelatedItems/RelatedItems';
import { renderWithProviders } from '../utils/test-utils';
import stateStub from '../proxies/stateProxy';
import {
  relatedIds,
  relatedProductPhotos,
  relatedProductDetails,
  relatedProductRatings,
} from '../proxies/itemListProxy';

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  rest.get('/products/:productId/related', (req, res, ctx) => res(
    ctx.json(relatedIds),
    ctx.delay(150),
  )),
  rest.get('/products/:productId', (req, res, ctx) => res(
    ctx.json(relatedProductDetails),
    ctx.delay(150),
  )),
  rest.get('/products/:productId/styles', (req, res, ctx) => res(
    ctx.json(relatedProductPhotos),
    ctx.delay(150),
  )),
  rest.get('/reviews/meta', (req, res, ctx) => {
    const productRatings = req.url.searchParams.get('product_id');
    return res(
      ctx.json(productRatings),
      ctx.delay(150),
    );
  }),
];

const server = setupServer(...handlers);

test('renders a product\'s information to its card', () => {
  renderWithProviders(<Router><FormatCard /></Router>, {
    preloadedState: {
      products: stateStub.products,
    },
  });
});
