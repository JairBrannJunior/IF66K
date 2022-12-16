import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import * as React from 'react';
import fetch from 'jest-fetch-mock';
import MovieDetail from './pages/MovieDetail';
import nock from 'nock';

fetch.enableMocks();
jest.spyOn(window, 'alert').mockImplementation(() => {});
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    state: { movie: { Title: 'Harry Potter and the Deathly Hallows: Part 2', Poster: 'https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg', imdbID: 'tt1201607' } }
  })
}));

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

describe('movie-detail', () => {
  beforeEach(() => {
    fetch.resetMocks();
  })

  it('render', () => {
    render(<MovieDetail />, { wrapper: BrowserRouter });
    
    expect(screen.getByText('Comentário')).toBeTruthy();
    expect(screen.getByText('Harry Potter and the Deathly Hallows: Part 2')).toBeTruthy();
  });

  it('view-comment', async () => {
    fetch.mockResponseOnce(JSON.stringify( [
      { 
        id: '1',
        comment: 'Teste comentário 1',
        user_id: '1',
        user_name: 'Teste Usuário 1',
        movie_id: 'tt1201607' 
      },
      { 
        id: '2',
        comment: 'Teste comentário 2',
        user_id: '1',
        user_name: 'Teste Usuário 1',
        movie_id: 'tt1201607' 
      },
      { 
        id: '3',
        comment: 'Teste comentário 3',
        user_id: '2',
        user_name: 'Teste Usuário 2',
        movie_id: 'tt1201607' 
      },
      { 
        id: '4',
        comment: 'Teste comentário 4',
        user_id: '2',
        user_name: 'Teste Usuário 2',
        movie_id: 'tt1201607'
      },
      { 
        id: '5',
        comment: 'Teste comentário 5',
        user_id: '3',
        user_name: 'Teste Usuário 3',
        movie_id: 'tt1201607' 
      }
    ]));
    localStorage.setItem("token", "token-válido");
    render(<MovieDetail />, { wrapper: BrowserRouter });

    await new Promise((r) => setTimeout(r, 3000));

    expect(screen.getByText('Teste comentário 1')).toBeTruthy();
    expect(screen.queryByText('Teste comentário não existe')).not.toBeTruthy();
    expect(screen.queryAllByText('Teste Usuário 2')).toHaveLength(2);
    expect(screen.queryAllByText('Teste Usuário não existe')).toHaveLength(0);
  });
});
