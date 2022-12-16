import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from './pages/Register';
import fetch from 'jest-fetch-mock';
import { register } from './functions/register';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate, 
}));

jest.spyOn(window, 'alert').mockImplementation(() => {});

fetch.enableMocks();

test('register', () => {
  render(<Register />, { wrapper: BrowserRouter });
  
  expect(screen.getByText('Fazer cadastro')).toBeTruthy();
});

it('register-data', async () => {
  render(<Register />, { wrapper: BrowserRouter });

  const button = screen.getByText("Fazer cadastro");
  fetch.mockResponseOnce(JSON.stringify('Registrado com sucesso!'));

  fireEvent.click(button);

  await new Promise((r) => setTimeout(r, 2000));

  expect(window.alert).toBeCalledWith('"Registrado com sucesso!"');
});