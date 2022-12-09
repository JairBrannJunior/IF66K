import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import * as React from 'react';
import fetch from 'jest-fetch-mock';
import Home from './pages/Home';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate, 
 }));

jest.spyOn(window, 'alert').mockImplementation(() => {});

fetch.enableMocks();

const localStorageMock = (function () {
	let store = {} as any;
  
	return {
	  getItem(key: any) {
		return store[key];
	  },
  
	  setItem(key: any, value: any) {
		store[key] = value;
	  },
  
	  clear() {
		store = {};
	  },
  
	  removeItem(key: any) {
		delete store[key];
	  },
  
	  getAll() {
		return store;
	  },
	};
  })();
  
  Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe('home', () => {
  beforeEach(() => {
    fetch.resetMocks();
  })

  it('render', () => {
    render(<Home />, { wrapper: BrowserRouter });
    
    expect(screen.getByPlaceholderText('Digite para pesquisar...')).toBeTruthy();
  });

  it('not logged', async () => {
    localStorage.setItem("logged", "0");

    render(<Home />, { wrapper: BrowserRouter });

    const inputSearch = screen.getByPlaceholderText('Digite para pesquisar...');
    fireEvent.change(inputSearch, { target: { value: 'harry' } });

    await new Promise((r) => setTimeout(r, 3000));
    
    expect(window.alert).toBeCalledWith('Usuário não logado!');
    expect(mockedUsedNavigate).toHaveBeenCalled();
  });
});
