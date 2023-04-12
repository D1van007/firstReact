import { describe, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import 'whatwg-fetch';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import getApiResource from '../../utils/network';
import CardExtended from '../card/CardExtended';
import { IPerson } from '../../types/type';

const firstPeople = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
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
    'https://swapi.dev/api/people/1',
    (
      req: any,
      res: (arg0: any, arg1: any) => any,
      ctx: {
        status: (arg0: number) => any;
        json: (arg0: {
          name: string;
          height: string;
          mass: string;
          hair_color: string;
          skin_color: string;
          eye_color: string;
          birth_year: string;
          gender: string;
          homeworld: string;
          films: string[];
          species: string[];
          vehicles: string[];
          starships: string[];
          created: string;
          edited: string;
          url: string;
        }) => any;
      }
    ) => {
      return res(ctx.status(200), ctx.json(firstPeople));
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

describe('Card', () => {
  it('Card render', async () => {
    await waitFor(() => {
      render(<CardExtended personID="1" personName="Luke Skywalker" />);
    });
    await getApiResource('https://swapi.dev/api/people/1').then((data) => {
      expect(
        screen.getByText<HTMLSelectElement>(`Name: ${(data as IPerson).name}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText<HTMLSelectElement>(
          `Gender: ${(data as IPerson).gender}`
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText<HTMLSelectElement>(
          `Date of birth: ${(data as IPerson).birth_year}`
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText<HTMLSelectElement>(
          `Height: ${(data as IPerson).height}`
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText<HTMLSelectElement>(`Mass: ${(data as IPerson).mass}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText<HTMLSelectElement>(
          `Hair color: ${(data as IPerson).hair_color}`
        )
      ).toBeInTheDocument();
    });
  });
});
