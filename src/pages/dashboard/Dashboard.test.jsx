import { fireEvent, render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';
import { act } from 'react-dom/test-utils';
import { renderWithProviders } from 'helpers/utils-test';

test('renders Dashboard component without crashing', () => {
  renderWithProviders(<Dashboard />);
  const containerElement = screen.getByTestId('dashboard-container');
  expect(containerElement).toBeInTheDocument();
});

test('renders Dashboard component with correct structure', () => {
  renderWithProviders(<Dashboard />);
  const leftMenuBar = screen.getByTestId('left-menu-bar');
  const customChart = screen.getByTestId('custom-chart');
  expect(leftMenuBar).toBeInTheDocument();
  expect(customChart).toBeInTheDocument();
});
