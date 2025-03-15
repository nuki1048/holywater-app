import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { ItemsSection } from '../ItemsSection/ItemsSection';
import { renderWithAllProviders } from '../../utils/test-utils';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('ItemsSection Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });
  });

  const mockItems = [
    { id: 1, name: 'Book 1', cover_url: 'https://example.com/book1.jpg' },
    { id: 2, name: 'Book 2', cover_url: 'https://example.com/book2.jpg' },
  ];

  const mockProps = {
    title: 'Sample Section',
    items: mockItems,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with given props', () => {
    const { getByText } = renderWithAllProviders(
      <ItemsSection {...mockProps} />,
      {}
    );

    expect(getByText('Sample Section')).toBeTruthy();
    expect(getByText('Book 1')).toBeTruthy();
    expect(getByText('Book 2')).toBeTruthy();
  });

  it('navigates to DetailsScreen when a book is pressed', () => {
    const { getByText } = renderWithAllProviders(
      <ItemsSection {...mockProps} />,
      {}
    );

    fireEvent.press(getByText('Book 1'));
    expect(mockNavigate).toHaveBeenCalledWith('DetailsScreen', { id: 1 });
  });
});
