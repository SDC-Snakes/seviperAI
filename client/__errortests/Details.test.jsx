// import React from 'react';
// import { act, render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import userEvent from '@testing-library/user-event';
// import { renderWithProviders } from './utils/productDetails-utils';

// import Details from '../src/components/ProductDetails/Details';
// import proxyProduct from './proxies/proxyProduct';
// import { useGetProductInfoQuery } from '../src/features/api/apiSlice';
// import stateStub from './proxies/stateStub';

// jest.mock('../src/features/api/apiSlice');

// test('products details render', async () => {
//   renderWithProviders(<Details />, { preloadedState: stateStub });
//   screen.debug();

//   // Check that loading state is not displayed
//   // expect(screen.queryByText('Loading...')).toBeNull();
//   expect(screen.getByText('Add to cart')).toBeInTheDocument();
// });
