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

it('input data', () => {
    render(<Register />, { wrapper: BrowserRouter });
    
    const inputName = screen.getByPlaceholderText("Digite seu nome");
    fireEvent.change(inputName, { target: { value: 'Jair' } });
    expect(screen.getByDisplayValue('Jair') === inputName).toBe(true)

    const inputEmail = screen.getByPlaceholderText("Email");
    fireEvent.change(inputEmail, { target: { value: 'teste@email.com' } });
    expect(screen.getByDisplayValue('teste@email.com') === inputEmail).toBe(true)

    const inputPassword = screen.getByPlaceholderText("Senha");
    fireEvent.change(inputPassword, { target: { value: '123456' } });
    expect(screen.getByDisplayValue('123456') === inputPassword).toBe(true)
});

it('register-data', async () => {
  render(<Register />, { wrapper: BrowserRouter });

  const button = screen.getByText("Fazer cadastro");
  fetch.mockResponseOnce(JSON.stringify('Registrado com sucesso!'));

  fireEvent.click(button);

  await new Promise((r) => setTimeout(r, 2000));

  expect(mockedUsedNavigate).toHaveBeenCalled();
  expect(window.alert).toBeCalledWith('Registrado com sucesso!');
});