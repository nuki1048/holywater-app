import React from 'react';
import { render } from '@testing-library/react-native';
import { fireEvent } from '@testing-library/react-native';
import { BookCard } from '../BookCard/BookCard';
import { renderWithAllProviders } from '../../utils/test-utils';

describe('BookCard Component', () => {
  const mockOnPress = jest.fn();

  const mockProps = {
    id: 1,
    name: 'Sample Book',
    cover_url: 'https://example.com/sample-book.jpg',
    onPress: mockOnPress,
    textColor: 'black',
  };

  it('renders correctly with given props', () => {
    const { getByText, getByTestId } = renderWithAllProviders(
      <BookCard {...mockProps} />,
      {}
    );

    expect(getByText('Sample Book')).toBeTruthy();
    expect(getByTestId('image')).toBeTruthy();
  });

  it('triggers onPress when pressed', () => {
    const { getByTestId } = renderWithAllProviders(
      <BookCard {...mockProps} />,
      {}
    );

    fireEvent.press(getByTestId('button'));
    expect(mockOnPress).toHaveBeenCalled();
  });
});
