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

  it('login', async () => {
    fetch.mockResponseOnce(JSON.stringify({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' }));

    render(<Login />, { wrapper: BrowserRouter });

    const button = screen.getByText("Fazer login");
    fireEvent.click(button);

    await new Promise((r) => setTimeout(r, 2000));

    expect(mockedUsedNavigate).toHaveBeenCalled();
  });

  it('login-failed', async () => {
    fetch.mockResponseOnce(JSON.stringify( { token: '' } ), {status: 401});

    render(<Login />, { wrapper: BrowserRouter });

    const button = screen.getByText("Fazer login");
    fireEvent.click(button);

    await new Promise((r) => setTimeout(r, 2000));

    expect(window.alert).toBeCalledWith('Usuário ou senha incorretos, tente novamente.');
  });
});
