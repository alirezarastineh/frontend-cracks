"use client";

import { useEffect, useState } from "react";
import { getInvoicesList } from "@/lib/api";
import { InvoiceOverview } from "@/types";

interface InvoiceListProps {
  onInvoiceSelect: (id: string) => void;
}

const InvoiceList = ({ onInvoiceSelect }: InvoiceListProps) => {
  const [invoices, setInvoices] = useState<InvoiceOverview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const fetchedInvoices = await getInvoicesList();
        setInvoices(fetchedInvoices);
        setLoading(false);
      } catch (err) {
        setError("Failed to load invoices.");
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  if (loading) {
    return <div>Loading invoices...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Invoice List</h2>
      {invoices.length > 0 ? (
        <ul>
          {invoices.map((invoice) => (
            <li
              key={invoice.invoiceNumber}
              onClick={() => onInvoiceSelect(invoice.invoiceNumber)}
            >
              <div>Invoice Number: {invoice.invoiceNumber}</div>
              <div>Invoice Date: {invoice.invoiceDate}</div>
              <div>Net Amount: {invoice.netAmount}</div>
              <div>Gross Amount: {invoice.grossAmount}</div>
              <div>Open Amount: {invoice.openAmount}</div>
              <div>Debitor: {invoice.debitor}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No invoices found.</div>
      )}
    </div>
  );
};

export default InvoiceList;
