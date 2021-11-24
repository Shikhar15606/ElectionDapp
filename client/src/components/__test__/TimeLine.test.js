import React from 'react';
import ReactDOM from 'react-dom';
import TimeLine from '../TimeLine';

import { render, screen } from '@testing-library/react';

// "test" or "it" both are same - we use it syntax
/* Test Block: Render component to test, find elements to interact
    interact with those elements and assert that the result is as expected.
*/

it('Election TimeLine displayed on the LandingPage', () => {
  render(<TimeLine />);
  const textElement = screen.getByText(/Election Process/i);
  expect(textElement).toBeInTheDocument();
});
