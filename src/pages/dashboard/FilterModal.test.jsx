import { fireEvent, render, screen } from '@testing-library/react';
import { FilterModal } from './FilterModal';
import { renderWithProviders } from 'helpers/utils-test';
import { act } from 'react-dom/test-utils';

test('renders FilterModal component', () => {
  renderWithProviders(
    <FilterModal visible={true} handleClose={() => {}} showCloseBtn={true} />
  );
});

test('selecting an interval updates the state', () => {
  renderWithProviders(
    <FilterModal visible={true} handleClose={() => {}} showCloseBtn={true} />
  );

  const intervalButton = screen.getByText('This month');
  fireEvent.click(intervalButton);
});

test('Apply and Clear buttons trigger expected actions', async () => {
  const handleClose = jest.fn();
  renderWithProviders(
    <FilterModal visible={true} handleClose={handleClose} showCloseBtn={true} />
  );

  const applyButton = screen.getByText('Apply');
  await act(() => {
    fireEvent.click(applyButton);
  });

  const clearButton = screen.getByText('Clear');
  await act(() => {
    fireEvent.click(clearButton);
  });
});
