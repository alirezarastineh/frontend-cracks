"use client";

import { useEffect, useState } from "react";
import { getInvoiceDetails } from "@/lib/api";
import { InvoiceDetail as InvoiceDetailType, InvoiceItem } from "@/types";

interface InvoiceDetailProps {
  invoiceId: string;
}

const InvoiceDetail = ({ invoiceId }: InvoiceDetailProps) => {
  const [invoice, setInvoice] = useState<InvoiceDetailType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const fetchedInvoice = await getInvoiceDetails(invoiceId);
        setInvoice(fetchedInvoice);
        setLoading(false);
      } catch (err) {
        setError("Failed to load invoice details.");
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceId]);

  if (loading) {
    return <div>Loading invoice details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!invoice) {
    return <div>No invoice details found.</div>;
  }

  return (
    <div>
      <h2>Invoice Details</h2>
      <div>Invoice Number: {invoice.invoiceNumber}</div>
      <div>Invoice Date: {invoice.invoiceDate}</div>
      <div>Debitor: {invoice.debitor}</div>
      <div>Total Net: {invoice.totalNet}</div>
      <div>Total Brutto: {invoice.totalBrutto}</div>
      <div>Due Date: {invoice.dueDate}</div>
      <div>Open Amount: {invoice.openAmount}</div>
      {invoice.totalVAT && <div>Total VAT: {invoice.totalVAT}</div>}
      <h3>Items</h3>
      <ul>
        {invoice.items.map((item: InvoiceItem, index: number) => (
          <li key={index}>
            <div>Description: {item.description}</div>
            <div>Amount: {item.amount}</div>
            <div>Price: {item.price}</div>
            <div>VAT Rate: {item.vatRate}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceDetail;
