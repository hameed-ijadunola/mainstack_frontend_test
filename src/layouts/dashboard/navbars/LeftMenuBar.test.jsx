import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LeftMenuBar from './LeftMenuBar';
import { act } from 'react-dom/test-utils';

describe('LeftMenuBar', () => {
  test('renders the correct number of menu items', () => {
    render(<LeftMenuBar />);
    const menuItems = screen.getAllByTestId('left-menu-bar');
    expect(menuItems).toHaveLength(1);
  });

  test('renders the correct number of menu items', () => {
    render(<LeftMenuBar />);
    const menuItems = screen.getAllByTestId('left-menu-bar');
    expect(menuItems[0].children).toHaveLength(4);
  });

  test('renders the correct tooltip on hover', async () => {
    render(<LeftMenuBar />);
    const firstMenuItem = screen.getByTestId('left-menu-bar').children[0];
    await act(async () => {
      fireEvent.mouseOver(firstMenuItem);
    });
    const tooltip = await screen.findByText('Link in Bio');
    expect(tooltip).toBeInTheDocument();
  });
});
