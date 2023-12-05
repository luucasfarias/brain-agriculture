import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/header';

describe('Header component', () => {
  it('renders Header correctly', () => {
    render(<Header />);

    expect(screen.getByText(/Brain Agriculture/i)).toBeInTheDocument();

    expect(screen.getByText(/Girmay/i)).toBeInTheDocument();
  });
});
