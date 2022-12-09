import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import * as React from 'react';
import fetch from 'jest-fetch-mock';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate, 
 }));

jest.spyOn(window, 'alert').mockImplementation(() => {});

fetch.enableMocks();

describe('login', () => {
  beforeEach(() => {
    fetch.resetMocks();
  })

  it('render', () => {
    render(<Login />, { wrapper: BrowserRouter });
    
    expect(screen.getByText('Fazer login')).toBeTruthy();
  });

  it('input data', () => {
    render(<Login />, { wrapper: BrowserRouter });
    
    const inputEmail = screen.getByPlaceholderText("Digite seu email");
    fireEvent.change(inputEmail, { target: { value: 'teste@email.com' } });
    expect(screen.getByDisplayValue('teste@email.com') === inputEmail).toBe(true)

    const inputPassword = screen.getByPlaceholderText("Digite sua Senha");
    fireEvent.change(inputPassword, { target: { value: '123456' } });
    expect(screen.getByDisplayValue('123456') === inputPassword).toBe(true)
  });

  it('login', async () => {
    fetch.mockResponseOnce(JSON.stringify( [{ id: 1, name: 'Jair', email: 'teste@email.com', password: '123456' }]));

    render(<Login />, { wrapper: BrowserRouter });

    const button = screen.getByText("Fazer login");
    fireEvent.click(button);

    await new Promise((r) => setTimeout(r, 2000));

    expect(mockedUsedNavigate).toHaveBeenCalled();
  });

  it('login-failed', async () => {
    fetch.mockResponseOnce(JSON.stringify( [] ));

    render(<Login />, { wrapper: BrowserRouter });

    const button = screen.getByText("Fazer login");
    fireEvent.click(button);

    await new Promise((r) => setTimeout(r, 2000));

    expect(window.alert).toBeCalledWith('Usuário ou senha incorretos, tente novamente.');
  });
});
