import React from 'react';
import { Container } from '@mui/material';
import Header from './components/Header';
import BalanceSheetTable from './components/BalanceSheetTable';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <h1>Balance Sheet Report</h1>
        <BalanceSheetTable />
      </Container>
    </>
  );
};

export default App;
