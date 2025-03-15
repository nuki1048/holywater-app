import React from 'react';
import { Book } from '../../../../types';
import {
  fireEvent,
  renderWithAllProviders,
} from '../../../../utils/test-utils';
import { YouWillLikeSection } from '../YouWillLikeSection';
import { useNavigation } from '@react-navigation/native';
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('YouWillLikeSection Component', () => {
  const mockBooks: Book[] = [
    {
      id: 1,
      name: 'Book 1',
      author: 'Author 1',
      genre: 'Fiction',
      cover_url: '',
      likes: '',
      quotes: '',
      summary: '',
      views: '',
    },
    {
      id: 2,
      name: 'Book 2',
      author: 'Author 2',
      genre: 'Non-Fiction',
      cover_url: '',
      likes: '',
      quotes: '',
      summary: '',
      views: '',
    },
  ];

  it('renders correctly with data', () => {
    const { getByText } = renderWithAllProviders(
      <YouWillLikeSection data={mockBooks} />,
      {}
    );

    expect(getByText('You will also like')).toBeTruthy();
    expect(getByText('Book 1')).toBeTruthy();
    expect(getByText('Book 2')).toBeTruthy();
  });

  it('renders correctly with no data', () => {
    const { getByText, queryByText } = renderWithAllProviders(
      <YouWillLikeSection data={undefined} />,
      {}
    );

    expect(getByText('You will also like')).toBeTruthy();
    expect(queryByText('Book 1')).toBeNull();
    expect(queryByText('Book 2')).toBeNull();
  });

  it('handles navigation on book press', () => {
    const mockDispatch = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({
      dispatch: mockDispatch,
    });

    const { getByText } = renderWithAllProviders(
      <YouWillLikeSection data={mockBooks} />,
      {}
    );

    fireEvent.press(getByText('Book 1'));
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: { name: 'DetailsScreen', params: { id: 1 } },
        type: 'REPLACE',
      })
    );
  });
});
