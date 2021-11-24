import React from 'react';
import ReactDOM from 'react-dom';
import AdminDashboard from '../AdminDashboard';

// "test" or "it" both are same - we use it syntax
/* Test Block: Render component to test, find elements to interact
    interact with those elements and assert that the result is as expected.
*/

it('AdminDashboard page is rendered', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AdminDashboard />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// it("renders again",() => {
//   render(<App/>);
//   const linkElement = screen.getByText(/Loading Web3/i);
//   expect(linkElement).toBeInTheDocument();
// });
