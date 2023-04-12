import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { setupServer } from 'msw/node';
import { rest } from 'msw';
import App from './app/App';
import About from './pages/About';
import Card from './components/card/Card';
import Search from './components/search/Search';
import Form from './components/form/Form';
import 'whatwg-fetch';
import getApiResource from './utils/network';
import PersonList from './components/personList/PersonList';
import { IPerson, ISwapi } from './types/type';
import Home from './pages/Home';

const personOne = {
  name: 'Luke Skywalker',
  height: 172,
  mass: 77,
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: 'https://swapi.dev/api/planets/1/',
  films: [
    'https://swapi.dev/api/films/2/',
    'https://swapi.dev/api/films/6/',
    'https://swapi.dev/api/films/3/',
    'https://swapi.dev/api/films/1/',
    'https://swapi.dev/api/films/7/',
  ],
  species: ['https://swapi.dev/api/species/1/'],
  vehicles: [
    'https://swapi.dev/api/vehicles/14/',
    'https://swapi.dev/api/vehicles/30/',
  ],
  starships: [
    'https://swapi.dev/api/starships/12/',
    'https://swapi.dev/api/starships/22/',
  ],
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z',
  url: 'https://swapi.dev/api/people/1/',
};

const server = setupServer(
  rest.get(
    `https://swapi.dev/api/people/1/`,
    (
      req: any,
      res: (arg0: any, arg1: any) => any,
      ctx: {
        status: (arg0: number) => any;
        json: (arg0: { results: IPerson }) => any;
      }
    ) => {
      return res(
        ctx.status(200),
        ctx.json({
          results: personOne,
        })
      );
    }
  )
);

beforeAll(() => {
  server.listen();
});
afterAll(() => {
  server.close();
});
afterEach(() => {
  server.resetHandlers();
});

describe('Page', () => {
  it('Renders About', () => {
    render(<About />);
    expect(
      screen.getByRole('heading', {
        level: 2,
      })
    ).toHaveTextContent('A long time ago, in a galaxy far, far away…');
  });

  it('Render not found if invalid path', () => {
    render(
      <MemoryRouter initialEntries={['/petrpetrovich']}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Not Found Page');
  });

  it('User element: exist after fetch data', async function exem() {
    render(
      <Card
        key="Luke Skywalker"
        name="Luke Skywalker"
        homeworld="Tatooine"
        url="https://swapi.dev/api/people/1/"
        birth_year="19BBY"
      />
    );

    expect(await screen.findByText(/Luke Skywalker/)).toBeInTheDocument();
  });

  it('should be able to type name input field', () => {
    const { getByTestId } = render(
      <Search
        inputText={(incomingText: string) => {
          incomingText.toLocaleLowerCase();
        }}
      />
    );

    fireEvent.change(getByTestId('search-input'), {
      target: { value: 'search' },
    });
    expect((getByTestId('search-input') as HTMLInputElement).value).toBe(
      'search'
    );
  });

  it('should be able to type name input-name field FormPage', () => {
    const { getByTestId } = render(<Form />);

    fireEvent.change(getByTestId('name-input'), {
      target: { value: 'abc' },
    });
    expect((getByTestId('name-input') as HTMLInputElement).value).toBe('abc');
  });

  it('All cards render', async () => {
    let amount = 0;
    getApiResource('https://swapi.dev/api/people/').then((data) => {
      render(<Home />);
      amount = ((data as ISwapi).results as IPerson[]).length;
      expect(screen.queryAllByRole('_person_item_d7hvx_1').length).toBe(amount);
    });
  });
});
