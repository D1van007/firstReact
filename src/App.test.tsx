/* eslint-disable func-names */
import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from './app/App';
import About from './pages/About';
import Card from './components/card/Card';
import Search from './components/search/Search';

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
  it('User element: exist after fetch data', async function () {
    render(
      <Card
        key="Luke Skywalker"
        name="Luke Skywalker"
        url="https://swapi.dev/api/people/1/"
        birth_year="19BBY"
      />
    );

    expect(await screen.findByText(/Luke Skywalker/)).toBeInTheDocument();
  });
  it('should be able to type name input field', () => {
    const { getByTestId } = render(<Search />);

    fireEvent.change(getByTestId('search-input'), {
      target: { value: 'search' },
    });
    expect((getByTestId('search-input') as HTMLInputElement).value).toBe(
      'search'
    );
  });
});
