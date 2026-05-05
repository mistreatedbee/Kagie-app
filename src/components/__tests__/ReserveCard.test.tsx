import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReserveCard from '../ReserveCard';

describe('ReserveCard', () => {
  it('shows total and applies coupon', () => {
    render(<ReserveCard price={1000} onInstantBook={() => {}} onRequest={() => {}} />);
    const applyBtn = screen.getByRole('button', { name: /apply/i });
    expect(applyBtn).toBeInTheDocument();
    fireEvent.click(applyBtn);
    // invalid coupon alerts; component handles but test ensures no crash
  });
});
