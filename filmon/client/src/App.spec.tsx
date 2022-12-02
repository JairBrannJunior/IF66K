import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';

test('sum', () => {
  render(<Login />, { wrapper: BrowserRouter });
  
  expect(screen.getByText('Fazer login')).toBeTruthy();
});
