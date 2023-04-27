import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Routers from './index';

describe('Routers', () => {
  it('renders the LoanApp component on / route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routers />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Business loan application/i)).toBeInTheDocument();
  });
});
