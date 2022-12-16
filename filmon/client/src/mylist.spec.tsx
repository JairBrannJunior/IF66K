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

  it('delete-movie', async () => {
    localStorage.clear();
    localStorage.setItem("token", "token-válido");
    localStorage.setItem("userData", JSON.stringify([{ userId: 1, userName: 'Jair' }]));
    fetch.mockResponses(
        [
            JSON.stringify( 
                [
                  {
                    id: 1,
                    movie_name: 'Teste filme 1',
                    movie_img: 'img',
                    watched: true
                  },
                  {
                    id: 2,
                    movie_name: 'Teste filme 2',
                    movie_img: 'img',
                    watched: true
                  },
                  {
                    id: 3,
                    movie_name: 'Teste filme 3',
                    movie_img: 'img',
                    watched: true
                  },
                  {
                    id: 4,
                    movie_name: 'Teste filme 4',
                    movie_img: 'img',
                    watched: false
                  },
                  {
                    id: 5,
                    movie_name: 'Teste filme 5',
                    movie_img: 'img',
                    watched: false
                  }
                ]
            ), {status: 200}
        ],
        [
            'Filme removido da lista', {status: 200}
        ],
        [
          JSON.stringify( 
              [
                {
                  id: 1,
                  movie_name: 'Teste filme 1',
                  movie_img: 'img',
                  watched: true
                },
                {
                  id: 2,
                  movie_name: 'Teste filme 2',
                  movie_img: 'img',
                  watched: true
                },
                {
                  id: 3,
                  movie_name: 'Teste filme 3',
                  movie_img: 'img',
                  watched: true
                },
                {
                  id: 5,
                  movie_name: 'Teste filme 5',
                  movie_img: 'img',
                  watched: false
                }
              ]
          ), {status: 200}
      ]

    );

    render(<MyList />, { wrapper: BrowserRouter });

    await new Promise((r) => setTimeout(r, 3000));

    expect(screen.getAllByText('(Já assistido!)')).toHaveLength(3);

    const movieText = screen.queryByText("Teste filme 4");
    expect(movieText).toBeInTheDocument();

    const buttons = screen.getAllByRole("delete");

    fireEvent.click(buttons[3]);

    await new Promise((r) => setTimeout(r, 3000));

    const movieText2 = screen.queryByText("Teste filme 4");
    expect(movieText2).not.toBeInTheDocument();
  })

  it('unwatch-movie', async () => {
    localStorage.clear();
    localStorage.setItem("token", "token-válido");
    localStorage.setItem("userData", JSON.stringify([{ userId: 1, userName: 'Jair' }]));
    fetch.mockResponses(
        [
            JSON.stringify( 
                [
                  {
                    id: 1,
                    movie_name: 'Teste filme 1',
                    movie_img: 'img',
                    watched: true
                  },
                  {
                    id: 2,
                    movie_name: 'Teste filme 2',
                    movie_img: 'img',
                    watched: true
                  },
                  {
                    id: 3,
                    movie_name: 'Teste filme 3',
                    movie_img: 'img',
                    watched: true
                  },
                  {
                    id: 4,
                    movie_name: 'Teste filme 4',
                    movie_img: 'img',
                    watched: false
                  },
                  {
                    id: 5,
                    movie_name: 'Teste filme 5',
                    movie_img: 'img',
                    watched: false
                  }
                ]
            ), {status: 200}
        ],
        [
            'Filme marcado como assistido', {status: 200}
        ],
        [
          JSON.stringify( 
              [
                {
                  id: 1,
                  movie_name: 'Teste filme 1',
                  movie_img: 'img',
                  watched: false
                },
                {
                  id: 2,
                  movie_name: 'Teste filme 2',
                  movie_img: 'img',
                  watched: true
                },
                {
                  id: 3,
                  movie_name: 'Teste filme 3',
                  movie_img: 'img',
                  watched: true
                },
                {
                  id: 4,
                  movie_name: 'Teste filme 4',
                  movie_img: 'img',
                  watched: false
                },
                {
                  id: 5,
                  movie_name: 'Teste filme 5',
                  movie_img: 'img',
                  watched: false
                }
              ]
          ), {status: 200}
      ]

    );

    render(<MyList />, { wrapper: BrowserRouter });

    await new Promise((r) => setTimeout(r, 3000));

    const buttons = screen.getAllByRole("watched");
    expect(buttons).toHaveLength(3);

    fireEvent.click(buttons[0]);

    await new Promise((r) => setTimeout(r, 3000));

    const buttons2 = screen.getAllByRole("watched");
    expect(buttons2).toHaveLength(2);
  });

  it('not-logged' , () => {
    localStorage.clear();

    render(<MyList />, { wrapper: BrowserRouter });

    expect(window.alert).toBeCalledWith('Usuário não logado!');
  });

});
