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

  it('search-and-add', async () => {
	localStorage.setItem("token", "token-válido");
    localStorage.setItem("userData", JSON.stringify([{ userId: 1, userName: 'Jair' }]));

	fetch.mockResponses(
		[
			JSON.stringify(
			{ 
				Search: 
				[
					{
						Title: 'Harry Potter and the Deathly Hallows: Part 2',
						Year: '2011',
						imdbID: 'tt1201607',
						Type: 'movie',
						Poster: 'https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg'
					},
					{
						Title: 'Harry Potter and the Deathly Hallows: Part 2',
						Year: '2011',
						imdbID: 'tt1201607',
						Type: 'movie',
						Poster: 'https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg'
					},
					{
						Title: 'Harry Potter and the Deathly Hallows: Part 2',
						Year: '2011',
						imdbID: 'tt1201607',
						Type: 'movie',
						Poster: 'https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg'
					},
					{
						Title: 'Harry Potter and the Deathly Hallows: Part 2',
						Year: '2011',
						imdbID: 'tt1201607',
						Type: 'movie',
						Poster: 'https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg'
					}
				],
				totalResults: '838',
				Response: 'True'
			}
			), {status: 200}
		],
		[
			'Adicionado o filme na sua lista!', {status: 200}
		]);

    render(<Home />, { wrapper: BrowserRouter });

	await new Promise((r) => setTimeout(r, 3000));

	const inputSearch = screen.getByPlaceholderText("Digite para pesquisar...");
    fireEvent.change(inputSearch, { target: { value: 'harry' } });

	await new Promise((r) => setTimeout(r, 3000));
    
	const addToMyList = screen.getAllByText("Adicionar a minha lista");
    expect(addToMyList).toHaveLength(4);

	const addToMyListClick = screen.getAllByRole("div");

	fireEvent.click(addToMyListClick[0]);

	await new Promise((r) => setTimeout(r, 3000));

	expect(window.alert).toBeCalledWith('Adicionado o filme na sua lista!');
  }, 30000);

  it('not logged', async () => {
	localStorage.clear();

    render(<Home />, { wrapper: BrowserRouter });

    await new Promise((r) => setTimeout(r, 3000));
    
    expect(window.alert).toBeCalledWith('Usuário não logado!');
    expect(mockedUsedNavigate).toHaveBeenCalled();
  });
});
