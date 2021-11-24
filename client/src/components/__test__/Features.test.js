import React from 'react';
import ReactDOM from 'react-dom';
import Features from '../Features';

import { render, screen } from '@testing-library/react';

// "test" or "it" both are same - we use it syntax
/* Test Block: Render component to test, find elements to interact
    interact with those elements and assert that the result is as expected.
*/

it('Salient Features displayed', () => {
  render(<Features />);
  const textElement = screen.getByText(/Salient Features/i);
  expect(textElement).toBeInTheDocument();
});
