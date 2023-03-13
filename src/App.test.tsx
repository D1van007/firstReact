import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { WrappedApp, App } from './App';

describe('App', () => {
  it('Renders hello world', () => {
    // ARRANGE;
    render(<WrappedApp />);
    // ACT;

    // EXPECT;
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
});
