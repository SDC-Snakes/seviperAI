import React from 'react';
import { act, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../../../utils/test-utils'

import Details from '../Details';

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.json('John Smith'), ctx.delay(150))
  })
]

const server = setupServer(...handlers)


test('products details render', async () => {
  let detailsStub = {
    description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
    features: [
      {
        feature: 'Fabric',
        value: 'canvas',
      },
      {
        feature: 'Buttons',
        value: 'Brass',
      },
    ],
  };

  renderWithProviders(<Details />);
  screen.debug();

  // Check that loading state is not displayed
  // expect(screen.queryByText('Loading...')).toBeNull();
  expect(screen.getByText(detailsStub.description)).toBeInTheDocument();
});
