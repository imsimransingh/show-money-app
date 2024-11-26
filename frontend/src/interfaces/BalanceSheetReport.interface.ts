// interfaces/BalanceSheetReport.ts
export interface iBalanceSheetReport {
    Title: string;
    Rows?: iBalanceSheetRow[];
  }
  
  export interface iBalanceSheetRow {
    RowType: string;
    Title?: string;
    Cells?: iBalanceSheetCell[];
    Rows?: iBalanceSheetRow[];
  }
  
  export interface iBalanceSheetCell {
    Value: string;
  }
  