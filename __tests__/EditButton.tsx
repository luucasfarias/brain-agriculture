import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import EditButton from '../src/components/edit-button';

jest.mock('next/router');

describe('EditButton component', () => {
  it('navigates to edit page on button click', () => {
    const mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });

    const id = 123;
    render(<EditButton id={id} />);

    // Encontrar o botão pelo texto ou outro seletor relevante
    const editButton = screen.getByRole('button');

    // Simular o clique no botão
    fireEvent.click(editButton);

    // Verificar se o router.push foi chamado com o URL correto
    expect(mockRouterPush).toHaveBeenCalledWith(`/cadastro/${id}`);
  });
});