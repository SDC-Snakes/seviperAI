import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormatCard from '../../components/RelatedItems/FormatCard';
import RelatedItems from '../../components/RelatedItems/RelatedItems';
import { relatedIds, relatedProductPhotos, relatedProductDetails, relatedProductRatings } from '../proxies/itemListProxy';
import { renderWithProviders } from '../utils/test-utils';
import stateStub from '../proxies/stateProxy';

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
  rest.get('/reviews/meta?product_id=:productId', (req, res, ctx) => res(
    ctx.json(relatedProductRatings),
    ctx.delay(150),
  )),
];

test('renders a product\'s information to its card', () => {
  renderWithProviders(<Router><FormatCard /></Router>, {
    preloadedState: {
      products: stateStub.products,
    },
  });
});
