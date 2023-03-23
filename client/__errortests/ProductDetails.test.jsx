// import React from 'react';
// import { act, render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import userEvent from '@testing-library/user-event';
// import { renderWithProviders } from './utils/productDetails-utils';

// import ProductDetails from '../src/components/ProductDetails/ProductDetails';
// import proxyProduct from './proxies/proxyProduct';
// import { useGetProductInfoQuery } from '../src/features/api/apiSlice';

// jest.mock('../src/features/api/apiSlice');

// test('products details render', async () => {
//   // useGetProductInfoQuery.mockResolvedValue();
//   const dataStub = proxyProduct;
//   useGetProductInfoQuery.mockReturnValue({
//     data: dataStub,
//     isLoading: true,
//     isSuccess: true,
//     isError: false,
//     error: null,
//   });
//   await act(async () => {
//     await renderWithProviders(<ProductDetails />);
//   });

//   // Check that loading state is not displayed
//   expect(screen.queryByText('Loading...')).toBeNull();
//   expect(screen.getByText('Add to cart')).toBeInTheDocument();
// });
