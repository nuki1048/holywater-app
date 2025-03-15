import { Book } from '../../types';
import { groupBooksByGenre } from '../data-utils';

describe('groupBooksByGenre', () => {
  it('should group books by their genre', () => {
    const books: Book[] = [
      { name: 'Book 1', genre: 'Fiction' },
      { name: 'Book 2', genre: 'Non-Fiction' },
      { name: 'Book 3', genre: 'Fiction' },
    ];

    const result = groupBooksByGenre(books);

    expect(result).toEqual({
      Fiction: [
        { name: 'Book 1', genre: 'Fiction' },
        { name: 'Book 3', genre: 'Fiction' },
      ],
      'Non-Fiction': [{ name: 'Book 2', genre: 'Non-Fiction' }],
    });
  });

  it('should return an empty object when the input array is empty', () => {
    const books: Book[] = [];

    const result = groupBooksByGenre(books);

    expect(result).toEqual({});
  });

  it('should handle books with the same genre correctly', () => {
    const books: Book[] = [
      { name: 'Book 1', genre: 'Fiction' },
      { name: 'Book 2', genre: 'Fiction' },
    ];

    const result = groupBooksByGenre(books);

    expect(result).toEqual({
      Fiction: [
        { name: 'Book 1', genre: 'Fiction' },
        { name: 'Book 2', genre: 'Fiction' },
      ],
    });
  });

  it('should handle books with no genre property', () => {
    const books: any[] = [
      { name: 'Book 1', genre: 'Fiction' },
      { name: 'Book 2' },
    ];

    const result = groupBooksByGenre(books as Book[]);

    expect(result).toEqual({
      Fiction: [{ name: 'Book 1', genre: 'Fiction' }],
    });
  });
});
