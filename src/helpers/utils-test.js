import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { MemoryRouter } from 'react-router-dom';

export function renderWithProviders(
  ui,
  { route = '/', preloadedState = {}, ...renderOptions } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    store,
    ...render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
  };
}
