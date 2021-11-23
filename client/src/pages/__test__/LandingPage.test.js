import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from '../LandingPage';

// "test" or "it" both are same - we use it syntax
/* Test Block: Render component to test, find elements to interact
    interact with those elements and assert that the result is as expected.
*/

it('should render LandingPage successfully', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LandingPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// it("renders again",() => {
//   render(<App/>);
//   const linkElement = screen.getByText(/Loading Web3/i);
//   expect(linkElement).toBeInTheDocument();
// });
