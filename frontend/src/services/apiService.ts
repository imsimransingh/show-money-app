import axios from 'axios';
import { iBalanceSheetReport } from '../interfaces/BalanceSheetReport.interface';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
export const fetchBalanceSheetData = async (): Promise<iBalanceSheetReport | null> => {
  try {
    const response = await axios.get(API_URL+'/xero/balance-sheet');
    if (response.data.Reports && response.data.Reports.length > 0) {
      return response.data.Reports[0];
    } else {
      throw new Error('No balance sheet data available.');
    }
  } catch (err) {
    console.error('Error fetching balance sheet data:', err);
    throw new Error('Failed to load balance sheet data.');
  }
};
