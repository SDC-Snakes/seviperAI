import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormatCard from '../../components/RelatedItems/FormatCard';
import RelatedItems from '../../components/RelatedItems/RelatedItems';
import itemListStub from '../proxies/itemListProxy';
import { renderWithProviders } from '../utils/test-utils';
import stateStub from '../proxies/stateProxy';

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  rest.get('/products/:productId/related', (req, res, ctx) => res(
    ctx.json(itemListStub),
    ctx.delay(150),
  )),
  rest.get('/products/:productId/styles', (req, res, ctx) => res(
    ctx.json(getProductStylesStub),
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
