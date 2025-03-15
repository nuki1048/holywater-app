export interface Book {
  author: string;
  cover_url: string;
  genre: string;
  id: number;
  likes: string;
  name: string;
  quotes: string;
  summary: string;
  views: string;
}

export interface Root {
  books: Book[];
  top_banner_slides: TopBannerSlide[];
  you_will_like_section: number[];
}

export interface Book {
  id: number;
  name: string;
  author: string;
  summary: string;
  genre: string;
  cover_url: string;
  views: string;
  likes: string;
  quotes: string;
}

export interface TopBannerSlide {
  id: number;
  book_id: number;
  cover: string;
}
