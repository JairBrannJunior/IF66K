import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import * as React from 'react';
import fetch from 'jest-fetch-mock';
import MyList from './pages/MyList';
import '@testing-library/jest-dom'

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

describe('mylist', () => {
  jest.setTimeout(30000);
  beforeEach(() => {
    fetch.resetMocks();
  })

  it('render', () => {
    render(<MyList />, { wrapper: BrowserRouter });
    
    expect(screen.getByText('Minha Lista')).toBeTruthy();
  });

  it('view', async () => {
    localStorage.setItem("logged", "1");
    localStorage.setItem("user", JSON.stringify([{ id: 1, name: 'Jair', email: 'teste@email.com', password: '123456' }]));
    fetch.mockResponses(
        [        
            JSON.stringify( 
                [{
                    id: 1,
                    userId: 'Jair',
                    movieId: 'teste@email.com',
                    movieName: '123456',
                    movieImg: 'asasa',
                    whatched: true
                }]
            ), {status: 200}
        ],
        [
            'Filme removido da lista', {status: 200}
        ],
        [
            JSON.stringify( 
                []
            ), {status: 200}
        ]

    );

    render(<MyList />, { wrapper: BrowserRouter });
    await new Promise((r) => setTimeout(r, 3000));

    const button = screen.getByRole("delete");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    await new Promise((r) => setTimeout(r, 3000));
    expect(button).not.toBeInTheDocument();
  })

});
