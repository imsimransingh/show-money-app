import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BalanceSheetTable from '../components/BalanceSheetTable';
import { fetchBalanceSheetData } from '../services/apiService';
import { iBalanceSheetReport } from '../interfaces/BalanceSheetReport.interface';

jest.mock('../services/apiService');

describe('BalanceSheetTable', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (fetchBalanceSheetData as jest.Mock).mockImplementation(() => new Promise(() => {}));
    render(<BalanceSheetTable />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders the error message when API fails', async () => {
    (fetchBalanceSheetData as jest.Mock).mockRejectedValue(new Error('Failed to load balance sheet data.'));
    render(<BalanceSheetTable />);
    await waitFor(() => {
      expect(screen.getByText('Failed to load balance sheet data.')).toBeInTheDocument();
    });
  });

  it('renders the balance sheet table correctly', async () => {
    const mockData: iBalanceSheetReport = {
      Title: 'Mock Balance Sheet',
      Rows: [
        {
          RowType: 'Header',
          Cells: [
            { Value: '' },
            { Value: '26 November 2024' },
            { Value: '27 November 2023' },
          ],
        },
        {
          RowType: 'Section',
          Title: 'Assets',
          Rows: [
            {
              RowType: 'Row',
              Cells: [
                { Value: 'Cash' },
                { Value: '1000' },
                { Value: '1500' },
              ],
            },
          ],
        },
        {
          RowType: 'SummaryRow',
          Cells: [
            { Value: 'Total Assets' },
            { Value: '1000' },
            { Value: '1500' },
          ],
        },
      ],
    };

    (fetchBalanceSheetData as jest.Mock).mockResolvedValue(mockData);
    render(<BalanceSheetTable />);

    await waitFor(() => {
      expect(screen.getByText('Mock Balance Sheet')).toBeInTheDocument();
    });
    expect(screen.getByText('Assets')).toBeInTheDocument();
    expect(screen.getByText('Cash')).toBeInTheDocument();
    expect(screen.getByText('Total Assets')).toBeInTheDocument();
  });

  it('renders no data message if there are no rows', async () => {
    const emptyData: iBalanceSheetReport = { Title: 'Empty Balance Sheet', Rows: [] };
    (fetchBalanceSheetData as jest.Mock).mockResolvedValue(emptyData);

    render(<BalanceSheetTable />);
    await waitFor(() => {
      expect(screen.getByText('No balance sheet data available.')).toBeInTheDocument();
    });
  });
});
