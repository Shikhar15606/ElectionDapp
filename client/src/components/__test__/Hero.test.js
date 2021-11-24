import React from 'react';
import ReactDOM from 'react-dom';
import Hero from '../Hero';

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// "test" or "it" both are same - we use it syntax
/* Test Block: Render component to test, find elements to interact
    interact with those elements and assert that the result is as expected.
*/

const MockHero = () => {
  return (
    <BrowserRouter>
      <Hero />
    </BrowserRouter>
  );
};

it('Hero section displayed', () => {
  render(<MockHero />);
  const textElement = screen.getByText(/Empowering India/i);
  expect(textElement).toBeInTheDocument();
});
