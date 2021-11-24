import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from '../LandingPage';

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// "test" or "it" both are same - we use it syntax
/* Test Block: Render component to test, find elements to interact
    interact with those elements and assert that the result is as expected.
*/

const MockLandingPage = () => {
  return (
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>
  );
};

it('should render LandingPage successfully', () => {
  render(MockLandingPage);
});
