import React from 'react';
import ReactDOM from 'react-dom';
import MessageComp from '../Message';

import { render, screen } from '@testing-library/react';

// "test" or "it" both are same - we use it syntax
/* Test Block: Render component to test, find elements to interact
    interact with those elements and assert that the result is as expected.
*/

it('Message Component renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MessageComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Message Component displays the text passed into it', () => {
  render(<MessageComp msg='Hardik is now React tester!' />);
  const msgElement = screen.getByText(/Hardik is now React tester!/i);
  expect(msgElement).toBeInTheDocument();
});
