import { fireEvent, render, screen } from '@testing-library/react';
import MainNavbar from './MainNavbar';
import { renderWithProviders } from 'helpers/utils-test';
import { act } from 'react-dom/test-utils';

test('renders MainNavbar without crashing', () => {
  renderWithProviders(<MainNavbar />);
  const navbarElement = screen.getByTestId('navbar');
  expect(navbarElement).toBeInTheDocument();
});

test('applies transparent class when transparent prop is true', () => {
  renderWithProviders(<MainNavbar transparent={true} />);
  const navbarElement = screen.getByTestId('navbar');
  expect(navbarElement).toHaveClass('navbar-transparent');
});

test('toggles dropdown menu on click', async () => {
  renderWithProviders(<MainNavbar />);
  const dropdownToggle = screen.getByTestId('dropdownUser');
  await act(() => {
    fireEvent.click(dropdownToggle);
  });
  const dropdownMenu = screen.getByTestId('dropdownMenu');
  expect(dropdownMenu).toBeVisible();
});
