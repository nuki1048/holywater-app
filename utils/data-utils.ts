import { Book } from '../types';

export function groupBooksByGenre(books: Book[]): Record<string, typeof books> {
  return books.reduce((acc: Record<string, typeof books>, book) => {
    if (!book.genre) return acc;

    if (!acc[book.genre]) {
      acc[book.genre] = [];
    }
    acc[book.genre].push(book);
    return acc;
  }, {});
}
