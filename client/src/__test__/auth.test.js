import React from 'react';
import ReactDOM from 'react-dom';
import Auth from '../auth.js';

// "test" or "it" both are same - we use it syntax
/* Test Block: Render component to test, find elements to interact
    interact with those elements and assert that the result is as expected.
*/

it('Login Authentication check is up and running', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Auth />, div);
  ReactDOM.unmountComponentAtNode(div);
});
