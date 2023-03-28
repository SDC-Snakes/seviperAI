import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/';
import userEvent from '@testing-library/user-event';
import itemStyles from './Items.module.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Carousel from '../../components/RelatedItems/Carousel';
import ComparisonModal from '../../components/RelatedItems/ComparisonModal';
import FormatCard from '../../components/RelatedItems/FormatCard';
import RelatedItems from '../../components/RelatedItems/RelatedItems';
import { renderWithProviders } from '../utils/test-utils';
import stateStub from '../proxies/stateProxy';
import relatedStub from '../proxies/relatedItemsProxy';
import FontAwesomeIcon from '../../__mocks__/fortawesome/fontawesomeMock';

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

const proxyName = relatedStub.relatedItem.details.name;
const proxyCategory = relatedStub.relatedItem.details.category;
const proxyImageURL = relatedStub.relatedItem.photos.results[0].photos[0].url;
const proxyPrice = relatedStub.relatedItem.details.default_price;
const proxySalePrice = relatedStub.relatedItem.details.sale_price;
const proxyItem = relatedStub.relatedItem;

test('renders a product\'s information to its card', async () => {
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
        related: relatedStub.related,
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
        related: relatedStub.related,
      },
    },
  );
  expect(screen.queryByText(relatedStub.related.combinedProductFeatures)).toBeNull();
});

test('comparison modal should appear when icon is clicked', async () => {
  // const handleClick = () => {
  //   relatedStub.related.modalOpen = false;
  // };
  renderWithProviders(
    <Router>
      {/* <FontAwesomeIcon icon="circle-info" /> */}
      <FormatCard
        name={proxyName}
        category={proxyCategory}
        image={proxyImageURL}
        price={proxyPrice}
        salePrice={proxySalePrice}
        item={proxyItem}
      />
    </Router>,
    {
      preloadedState: {
        products: stateStub.products,
        related: relatedStub.related,
      },
    },
  );
  const findIcon = await screen.findByLabelText('icon');
  expect(findIcon).toBeInTheDocument();
  fireEvent.click(findIcon);
  // screen.logTestingPlaygroundURL();
  expect(await screen.findByLabelText('modal')).toBeInTheDocument();
});

// test('comparison modal should be null on load', async () => {
//   renderWithProviders(
//     <Router><ComparisonModal /></Router>,
//     {
//       preloadedState: {
//         related: relatedStub.related,
//       },
//     },
//   );
//   expect(screen.queryByText(relatedStub.related.combinedProductFeatures)).toBeNull();
// });

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