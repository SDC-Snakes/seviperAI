import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import ComparisonModal from '../../components/RelatedItems/ComparisonModal';
import FormatCard from '../../components/RelatedItems/FormatCard';
import OutfitList from '../../components/RelatedItems/OutfitList';
import ItemsList from '../../components/RelatedItems/ItemsList';
import { renderWithProviders } from '../utils/test-utils';
import stateStub from '../proxies/stateProxy';
import relatedStub from '../proxies/relatedItemsProxy';

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  rest.get('/products/:productId/related', (req, res, ctx) => res(
    ctx.json(relatedStub.related.related),
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
  rest.get('/reviews/meta', (req, res, ctx) => res(
    ctx.json(relatedStub.relatedItem.ratings),
    ctx.delay(150),
  )),
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

test('Fills cards with data pulled from the API', async () => {
  renderWithProviders(
    <Router>
      <ItemsList relatedIndex={relatedStub.related.relatedIndex} />
    </Router>,
    {
      preloadedState: {
        products: stateStub.products,
        related: relatedStub.related,
      },
    },
  );
  expect(await screen.findByText('Other items that might interest you')).toBeInTheDocument();
  expect(screen.queryByText('Loading...')).toBeNull();
});

test('Renders a product\'s information to its card', async () => {
  renderWithProviders(
    <Router>
      <FormatCard
        name={proxyName}
        category={proxyCategory}
        image={proxyImageURL}
        price={proxyPrice}
        salePrice={proxySalePrice}
      />
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

test('Comparison modal should be null on load', async () => {
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

test('Comparison modal should appear when icon is clicked', async () => {
  renderWithProviders(
    <Router>
      <ComparisonModal />
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
  const findIcon = await screen.findByLabelText('modal-icon');
  expect(findIcon).toBeInTheDocument();
  await userEvent.click(findIcon);
  expect(await screen.findByLabelText('modal')).toBeInTheDocument();
});

test('Click on x icon should remove item from outfit', async () => {
  renderWithProviders(
    <Router>
      <ComparisonModal />
      <FormatCard
        name={proxyName}
        category={proxyCategory}
        image={proxyImageURL}
        price={proxyPrice}
        salePrice={proxySalePrice}
        item={proxyItem}
        outfit={"outfit"}
      />
    </Router>,
    {
      preloadedState: {
        products: stateStub.products,
        related: relatedStub.related,
      },
    },
  );
  screen.logTestingPlaygroundURL();
  const removeItem = await screen.findByLabelText('remove-icon');
  expect(removeItem).toBeInTheDocument();
  await userEvent.click(removeItem);
  expect(await screen.queryByLabelText('modal')).toBeNull();
});

test('Your outfit title renders to the page', () => {
  renderWithProviders(
    <Router>
      <OutfitList />
    </Router>,
  );
  expect(screen.getByText('Your outfit')).toBeInTheDocument();
  expect(screen.getByText('Add to outfit')).toBeInTheDocument();
});

test('Outfit cards render to the screen', () => {
  renderWithProviders(
    <Router>
      <OutfitList />
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
  expect(screen.getByText('Kicks')).toBeInTheDocument();
  expect(document.querySelector('img').getAttribute('src')).toBe(proxyImageURL);
  expect(screen.getByText('Summer Shoes')).toBeInTheDocument();
});

// test('Carousel renders both lists to the screen', async () => {
//   renderWithProviders(
//     <Router>
//       <Carousel />
//     </Router>,
//     {
//       preloadedState: {
//         products: stateStub.products,
//         related: relatedStub.related,
//         reviews: relatedStub.related.selectedStyle,
//       },
//     },
//   );
//   expect(await screen.findByLabelText('left-arrow')).toBeInTheDocument();
// });

// test('items list cards render to the screen', () => {
//   renderWithProviders(
//     <Router>
//       <ItemsList />
//       <FormatCard
//         name={proxyName}
//         category={proxyCategory}
//         image={proxyImageURL}
//         price={proxyPrice}
//         salePrice={proxySalePrice}
//         item={proxyItem}
//       />
//     </Router>,
//     {
//       preloadedState: {
//         products: stateStub.products,
//         related: relatedStub.related,
//       },
//     },
//   );
//   screen.logTestingPlaygroundURL();
//   expect(screen.getByText('Kicks')).toBeInTheDocument();
//   expect(document.querySelector('img').getAttribute('src')).toBe(proxyImageURL);
//   expect(screen.getByText('Summer Shoes')).toBeInTheDocument();
// });

// test('carousal should move one index when an arrow is clicked', async () => {
//   renderWithProviders(
//     <Router>
//       <Carousel />
//     </Router>,
//     {
//       preloadedState: {
//         products: stateStub.products,
//         related: relatedStub.related,
//       },
//     },
//   );
//   const findArrow = await screen.findByLabelText('right-arrow');
//   screen.logTestingPlaygroundURL();
//   expect(findArrow).toBeInTheDocument();
// });

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