import React from 'react';
import { render, screen } from '@testing-library/react';
import { useFarmer } from '@/contexts/farmer-context';
import PieChartStates from '@/components/pie-chart-states';

jest.mock('../hooks/farmer');

describe('PieChartStates component', () => {
  it('renders PieChartStates correctly', () => {
    const mockFarmers = [
      { id: 2, state: 'MA' },
      { id: 1, state: 'PI' },
    ];
    (useFarmer as jest.Mock).mockReturnValue({ farmers: mockFarmers });

    render(<PieChartStates />);

    expect(screen.getByText(/Fazendas por estado/i)).toBeInTheDocument();

    expect(screen.getByTestId('chart')).toBeInTheDocument();
  });

  it('generates correct chart data', () => {
    const mockFarmers = [
      { id: 2, state: 'MA' },
      { id: 1, state: 'PI' },
      { id: 3, state: 'PA' },
    ];
    (useFarmer as jest.Mock).mockReturnValue({ farmers: mockFarmers });

    render(<PieChartStates />);

    const expectedChartData = [
      ['State', ''],
      ['MA', 2],
      ['PI', 1],
    ];

    expect(screen.getByTestId('chart')).toHaveAttribute(
      'data-chartdata',
      JSON.stringify(expectedChartData)
    );
  });
});
