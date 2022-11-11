import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './pages/Login';

test('renders learn react link', () => {
  render(<Login />);
  const linkElement = screen.getByText(/Digite seu email/i);
  expect(linkElement).toBeInTheDocument();
});
