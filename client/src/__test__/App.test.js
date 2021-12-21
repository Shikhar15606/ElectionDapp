import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

import { render, screen } from '@testing-library/react';

// "test" or "it" both are same - we use it syntax
/* Test Block: Render component to test, find elements to interact
    interact with those elements and assert that the result is as expected.
*/

it('Main App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Metamask prompt renders before App', () => {
  render(<App />);
  const linkElement = screen.getByText(/You're not connected to your wallet./i);
  expect(linkElement).toBeInTheDocument();
});
