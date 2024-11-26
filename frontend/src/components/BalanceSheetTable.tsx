import React, { useEffect, useState, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';
import { iBalanceSheetReport, iBalanceSheetRow } from '../interfaces/BalanceSheetReport.interface';
import styles from '../styles/BalanceSheetTable.module.css';
import { fetchBalanceSheetData } from '../services/apiService';
const BalanceSheetTable: React.FC = () => {
  const [balanceSheet, setBalanceSheet] = useState<iBalanceSheetReport | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const renderRows = useCallback((rows: iBalanceSheetRow[], level: number = 0) => {
    return rows.map((row, index) => {
      const key = `row-${row.RowType}-${index}`;
      switch (row.RowType) {
        case 'Header':
          return (
            <TableRow key={key} className={styles.headerRow}>
              {row.Cells?.map((cell, idx) => (
                <TableCell key={`header-cell-${idx}`} align="center" className={styles.headerCell}>
                  {cell.Value}
                </TableCell>
              ))}
            </TableRow>
          );

        case 'Section':
          return (
            <React.Fragment key={key}>
              {row.Title && (
                <TableRow>
                  <TableCell colSpan={3} className={styles.sectionTitle} style={{ paddingLeft: `${level + 1 * 16}px` }}>
                    {row.Title}
                  </TableCell>
                </TableRow>
              )}
              {renderRows(row.Rows || [], level + 2)}
            </React.Fragment>
          );

        case 'SummaryRow':
          return (
            <TableRow key={key} className={styles.summaryRow}>
              {row.Cells?.map((cell, idx) => (
                <TableCell className="ft-bolder" key={`summary-cell-${idx}`} align={idx === 0 ? 'left' : 'right'}>
                  {cell.Value}
                </TableCell>
              ))}
            </TableRow>
          );

        case 'Row':
        default:
          return (
            <TableRow key={key}>
              {row.Cells?.map((cell, idx) => (
                <TableCell key={`data-cell-${idx}`} align={idx === 0 ? 'left' : 'right'}>
                  {cell.Value}
                </TableCell>
              ))}
            </TableRow>
          );
      }
    });
  }, []);

  // Fetch balance sheet data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchBalanceSheetData();
        setBalanceSheet(data);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className={styles.loadingContainer}><CircularProgress /></div>;
  }

 
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!balanceSheet || !balanceSheet.Rows || balanceSheet.Rows.length === 0) {
    return <Typography>No balance sheet data available.</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ marginTop: 4 }} className={styles.tableContainer}>
      <Typography variant="h6" component="div" className={styles.tableTitle}>
        {balanceSheet.Title}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right">Amount (Current Period)</TableCell>
            <TableCell align="right">Amount (Previous Period)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderRows(balanceSheet.Rows || [])}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default BalanceSheetTable;
