import { create } from 'zustand';
import { Book, Root, TopBannerSlide } from '../types';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
type BooksStoreState = {
  books: Book[];
  topBannerSlide: TopBannerSlide[];
  detailCarousels: Book[] | undefined;
  youWillLikeSection: number[];
  isInitialized: boolean;
};

type BookStoreActions = {
  initializeStore: (
    data: Root & { detailCarousels: Book[] | undefined }
  ) => void;
};

type BooksStore = BooksStoreState & BookStoreActions;

export const useBooksStore = create<BooksStore>()(
  persist<BooksStore>(
    (set) => ({
      books: [],
      isInitialized: false,
      topBannerSlide: [],
      detailCarousels: [],
      youWillLikeSection: [],

      initializeStore: (data) => {
        set({
          books: data.books,
          topBannerSlide: data.top_banner_slides,
          youWillLikeSection: data.you_will_like_section,
          detailCarousels: data.detailCarousels,
          isInitialized: true,
        });
      },
    }),
    {
      storage: createJSONStorage(() => AsyncStorage),
      name: 'books-store',
    }
  )
);
