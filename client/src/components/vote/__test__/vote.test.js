import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from '../Pagination';
import Step1 from '../Step1';
import Step2 from '../Step2';

import { render, screen } from '@testing-library/react';

// "test" or "it" both are same - we use it syntax
/* Test Block: Render component to test, find elements to interact
    interact with those elements and assert that the result is as expected.
*/

it('Step1 of vote requires user input of Ethereum Id', () => {
  render(<Step1 />);
  const linkElement = screen.getByText(/Please enter the Ethereum Id/i);
  expect(linkElement).toBeInTheDocument();
});

/* Async await on props
it('Step2 of vote requires user to select candidate of his choice', async () => {
  render(<Step2 />);
  const linkElement = await screen.findByText(/Please Select The Candidate/i);
  expect(linkElement).toBeInTheDocument();
});
*/
