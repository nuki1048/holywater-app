import React from 'react';
import { render } from '@testing-library/react-native';
import { BookDetails } from '../BookDetails';
import { renderWithAllProviders } from '../../../../utils/test-utils';

describe('BookDetails Component', () => {
  it('renders correctly with all props', () => {
    const { getByText } = renderWithAllProviders(
      <BookDetails views='123' likes='456' quotes='789' genre='Fiction' />,
      {}
    );

    expect(getByText('123')).toBeTruthy();
    expect(getByText('Readers')).toBeTruthy();
    expect(getByText('456')).toBeTruthy();
    expect(getByText('Likes')).toBeTruthy();
    expect(getByText('789')).toBeTruthy();
    expect(getByText('Quotes')).toBeTruthy();
    expect(getByText('Fiction')).toBeTruthy();
    expect(getByText('Genre')).toBeTruthy();
  });

  it('renders correctly with undefined props', () => {
    const { getByText } = renderWithAllProviders(
      <BookDetails
        views={undefined}
        likes={undefined}
        quotes={undefined}
        genre={undefined}
      />,
      {}
    );

    expect(getByText('Readers')).toBeTruthy();
    expect(getByText('Likes')).toBeTruthy();
    expect(getByText('Quotes')).toBeTruthy();
    expect(getByText('Genre')).toBeTruthy();
  });
});
