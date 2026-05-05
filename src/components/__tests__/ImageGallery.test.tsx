import React from 'react';
import { render, screen } from '@testing-library/react';
import ImageGallery from '../ImageGallery';

describe('ImageGallery', () => {
  const images = ['https://example.com/1.jpg','https://example.com/2.jpg'];
  it('renders images and thumbnails', () => {
    render(<ImageGallery images={images} />);
    expect(screen.getAllByRole('button', { name: /View image/i }).length).toBe(images.length);
  });
});
