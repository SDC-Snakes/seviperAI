import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import userEvent from '@testing-library/user-event';
import itemStyles from './Items.module.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Carousel from '../../components/RelatedItems/Carousel';
import ComparisonModal from '../../components/RelatedItems/ComparisonModal';
import FormatCard from '../../components/RelatedItems/FormatCard';
import relatedStub from '../../components/RelatedItems/RelatedItems';
import { renderWithProviders } from '../utils/test-utils';
import stateStub from '../proxies/stateProxy';
import relatedStub from '../proxies/relatedItemsProxy';

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  rest.get('/products/:productId/related', (req, res, ctx) => res(
    ctx.json(relatedStub.related.relatedIds),
    ctx.delay(150),
  )),
  rest.get('/products/:productId', (req, res, ctx) => res(
    ctx.json(relatedStub.relatedItem),
    ctx.delay(150),
  )),
  rest.get('/products/:productId/styles', (req, res, ctx) => res(
    ctx.json(relatedStub.relatedItem.photos),
    ctx.delay(150),
  )),
  rest.get('/reviews/meta', (req, res, ctx) => {
    const productRatings = req.url.searchParams.getAll('product_id');
    return res(
      ctx.json(productRatings),
      ctx.delay(150),
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test('renders a product\'s information to its card', async () => {
  const proxyName = relatedItem.details.name;
  const proxyCategory = relatedItem.details.category;
  const proxyImageURL = relatedItem.photos.results[0].photos[0].url;
  const proxyPrice = relatedItem.details.default_price;
  const proxySalePrice = relatedItem.details.sale_price;

  renderWithProviders(
  <Router>
    <FormatCard
      name={proxyName}
      category={proxyCategory}
      image={proxyImageURL}
      price={proxyPrice}
      salePrice={proxySalePrice} />
  </Router>,
  {
    preloadedState: {
      products: stateStub.products,
      related: relatedItem,
    },
  },
  );
  expect(await screen.findByText(proxyName)).toBeInTheDocument();
  expect(await screen.findByText(proxyCategory)).toBeInTheDocument();
  expect(await document.querySelector('img').getAttribute('src')).toBe(proxyImageURL);
  expect(await screen.findByText(`$${proxyPrice}`)).toBeInTheDocument();
});

test('comparison modal should be null on load', async () => {
  renderWithProviders(
    <Router><ComparisonModal /></Router>,
    {
      preloadedState: {
        combinedProductFeatures: combinedProductFeat,
      },
    },
  );
  expect(screen.queryByText(combinedProductFeat)).toBeNull();
});


test('comparison modal should appear when icon is clicked', async () => {
  renderWithProviders(
    <Router>
      <ComparisonModal />
      <FormatCard />
    </Router>,
    {
      preloadedState: {
        combinedProductFeatures: combinedProductFeat,
      },
    },
  );
  screen.logTestingPlaygroundURL();
  expect(screen.findByText('Fabric: 100% Cotton')).toBeInTheDocument();
  expect(screen.queryByText(combinedProductFeat)).toBeNull();
});

// test('navigates to product\'s page when double clicked', () => {
//   window.location.assign = jest.fn();
//   renderWithProviders(
//     <Router>
//       <FormatCard className={itemStyles['items-card']} onDoubleClick={window.location.assign} />
//     </Router>,
//   );
//   const cardComponent = screen.getByTestId("card");

//   userEvent.dblClick(cardComponent);
//   expect(window.location.pathname).toContain(`/${relatedItem.product_id}`);
// });

// test('navigates to product\'s page when double clicked', async () => {
//   const doubleClick = jest.fn();
//   renderWithProviders(
//     <Router>
//       <FormatCard className={itemStyles['items-card']} onDoubleClick={doubleClick} />
//     </Router>,
//   );
//   const cardComponent = screen.getByTestId("card");

//   userEvent.dblClick(cardComponent);
//   expect(window.location.pathname).toContain(`/${relatedItem.product_id}`);
// });