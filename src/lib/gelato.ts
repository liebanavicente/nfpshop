import "server-only";

// Sandbox vs live base URL — Gelato issues a separate API key per environment.
// https://dashboard.gelato.com/docs/orders/v4/create/
const GELATO_ORDERS_API_BASE =
  process.env.GELATO_API_BASE_URL ?? "https://order.gelatoapis.com/v4";

export interface GelatoOrderItem {
  itemReferenceId: string;
  quantity: number;
  /**
   * The product UID from your Gelato dashboard. For a product you already
   * created there (design attached to a template), this alone is enough.
   * For a blank catalog product, also pass `files` with the print-ready design.
   */
  productUid: string;
  files?: { type: string; url: string }[];
}

export interface GelatoShippingAddress {
  firstName: string;
  lastName: string;
  companyName?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postCode: string;
  state?: string;
  country: string; // ISO 3166-1 alpha-2
  email: string;
  phone?: string;
  isBusiness?: boolean;
  federalTaxId?: string;
  stateTaxId?: string;
  registrationState?: string;
}

export interface CreateGelatoOrderInput {
  orderReferenceId: string;
  customerReferenceId?: string;
  currency: string;
  items: GelatoOrderItem[];
  shippingAddress: GelatoShippingAddress;
  shipmentMethodUid?: string;
}

export async function createGelatoOrder(input: CreateGelatoOrderInput) {
  const apiKey = process.env.GELATO_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GELATO_API_KEY environment variable");
  }

  const response = await fetch(`${GELATO_ORDERS_API_BASE}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
    },
    body: JSON.stringify({
      orderType: "order",
      orderReferenceId: input.orderReferenceId,
      customerReferenceId: input.customerReferenceId,
      currency: input.currency,
      items: input.items,
      shippingAddress: input.shippingAddress,
      shipmentMethodUid: input.shipmentMethodUid,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Gelato order creation failed (${response.status}): ${body}`,
    );
  }

  return response.json();
}
