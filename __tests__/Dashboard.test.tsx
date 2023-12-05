import React from 'react';
import { render, screen } from '@testing-library/react';
import { useFarmer } from '@/contexts/farmer-context';
import Dashboard from '@/components/dashboard';

jest.mock('../hooks/farmer');

describe('Dashboard component', () => {
  it('renders Dashboard correctly', () => {
    const mockFarmers = [
      { id: 1, totalFarmArea: 100, totalVegetationArea: 50, totalArableArea: 50 },
      { id: 2, totalFarmArea: 150, totalVegetationArea: 70, totalArableArea: 80 },
    ];
    (useFarmer as jest.Mock).mockReturnValue({ farmers: mockFarmers, updateFarmers: jest.fn() });

    render(<Dashboard dataFarmers={mockFarmers} />);

    expect(screen.getByText(/Total de fazendas/i)).toBeInTheDocument();
    expect(screen.getByText(/Área total de fazendas em hectares/i)).toBeInTheDocument();
    expect(screen.getByText(/Área total de uso do solo/i)).toBeInTheDocument();
    expect(screen.getByTestId('PieChartCrops')).toBeInTheDocument();
    expect(screen.getByTestId('PieChartStates')).toBeInTheDocument();
    expect(screen.getByTestId('TableFarmers')).toBeInTheDocument();
  });

  it('calculates total farms correctly', () => {
    const mockFarmers = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ];
    (useFarmer as jest.Mock).mockReturnValue({ farmers: mockFarmers, updateFarmers: jest.fn() });

    render(<Dashboard dataFarmers={mockFarmers} />);

    expect(screen.getByText(/Total de fazendas/i)).toHaveTextContent('3');
  });

  it('calculates total area farms correctly', () => {
    const mockFarmers = [
      { id: 1, totalFarmArea: 100 },
      { id: 2, totalFarmArea: 150 },
    ];
    (useFarmer as jest.Mock).mockReturnValue({ farmers: mockFarmers, updateFarmers: jest.fn() });

    render(<Dashboard dataFarmers={mockFarmers} />);

    expect(screen.getByText(/Área total de fazendas em hectares/i)).toHaveTextContent('250');
  });

  it('calculates total used area farms correctly', () => {
    const mockFarmers = [
      { id: 1, totalVegetationArea: 50, totalArableArea: 30 },
      { id: 2, totalVegetationArea: 70, totalArableArea: 40 },
    ];
    (useFarmer as jest.Mock).mockReturnValue({ farmers: mockFarmers, updateFarmers: jest.fn() });

    render(<Dashboard dataFarmers={mockFarmers} />);

    expect(screen.getByText(/Área total de uso do solo/i)).toHaveTextContent('190');
  });
});
