export interface InvoiceOverview {
  invoiceNumber: string;
  invoiceDate: string;
  netAmount: number;
  grossAmount: number;
  openAmount: number; // Balance
  debitor: string;
}

export interface InvoiceItem {
  description: string;
  amount: number;
  price: number;
  vatRate: number;
}

export interface InvoiceDetail {
  invoiceNumber: string;
  invoiceDate: string;
  items: InvoiceItem[];
  debitor: string;
  totalNet: number; // Sum (total netto)
  totalBrutto: number; // Brutto (Total Brutto)
  dueDate: string;
  openAmount: number; // Balance
  totalVAT?: number; // Optional
}
