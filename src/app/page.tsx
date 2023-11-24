"use client";

import { useState } from "react";
import InvoiceDetail from "@/components/InvoiceDetail";
import InvoiceList from "@/components/InvoiceList";

const Page = () => {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(
    null
  );

  const handleInvoiceSelect = (id: string) => {
    setSelectedInvoiceId(id);
  };

  return (
    <div>
      {selectedInvoiceId ? (
        <InvoiceDetail invoiceId={selectedInvoiceId} />
      ) : (
        <InvoiceList onInvoiceSelect={handleInvoiceSelect} />
      )}
    </div>
  );
};

export default Page;
