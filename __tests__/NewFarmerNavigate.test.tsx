import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import NewFarmerNavigate from '@/components/new-farmer-navigate';

jest.mock('next/router');

describe('NewFarmerNavigate component', () => {
  it('navigates to /cadastro on button click', () => {
    const mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });

    render(<NewFarmerNavigate />);

    const newFarmerButton = screen.getByText(/Novo produtor/i);

    fireEvent.click(newFarmerButton);

    expect(mockRouterPush).toHaveBeenCalledWith('/cadastro');
  });
});
