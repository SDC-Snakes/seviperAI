import React from 'react';
import { render, screen } from '@testing-library/react';
import Dropdown from '../components/ReviewsRatings/SortReviews';
import '@testing-library/jest-dom';

describe('Dropdown component', () => {
  test('renders "sort-options" element', () => {
    render(<Dropdown />);
    const sortOptionsElement = screen.getByText('relevant');
    expect(sortOptionsElement).toBeInTheDocument();
  });
});
