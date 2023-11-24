import { getAuthToken } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Fetches an overview of created invoices.
 */
export async function getInvoicesList() {
  const token = await getAuthToken();
  if (!token) {
    throw new Error("No auth token available");
  }

  try {
    const response = await fetch(`${BASE_URL}/v1/invoices/debit/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch invoices list: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching invoices list:", error);
    throw error;
  }
}

/**
 * Fetches details of a single invoice by its ID.
 * @param {string} id - The ID of the invoice.
 */
export async function getInvoiceDetails(id: string) {
  const token = await getAuthToken();
  if (!token) {
    throw new Error("No auth token available");
  }

  try {
    const response = await fetch(`${BASE_URL}/v1/invoices/debit/list/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch invoice details: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching invoice details:", error);
    throw error;
  }
}
