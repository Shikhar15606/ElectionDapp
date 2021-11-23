import React from 'react';
import ReactDOM from 'react-dom';
import Index from '../index.js';

// "test" or "it" both are same - we use it syntax
/* Test Block: Render component to test, find elements to interact
    interact with those elements and assert that the result is as expected.
*/

it('should load index.js properly', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Index />, div);
  ReactDOM.unmountComponentAtNode(div);
});
