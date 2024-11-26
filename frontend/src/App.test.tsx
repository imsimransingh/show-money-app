import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App'; 
 
jest.mock('./components/Header', () => () => <div>Mock Header</div>);
jest.mock('./components/BalanceSheetTable', () => () => <div>Mock Balance Sheet Table</div>);

describe('App Component', () => {
  it('renders the header component', () => {
    // Act
    render(<App />);

    // Assert
    expect(screen.getByText('Mock Header')).toBeInTheDocument();
  });

  it('renders the balance sheet report heading', () => {
    // Act
    render(<App />);

    // Assert
    expect(screen.getByRole('heading', { name: /balance sheet report/i })).toBeInTheDocument();
  });

  it('renders the BalanceSheetTable component', () => {
    // Act
    render(<App />);

    // Assert
    expect(screen.getByText('Mock Balance Sheet Table')).toBeInTheDocument();
  });
});
