export type Payment = {
  paymentKey: string;
  orderId: string;
  method: string;
  totalAmount: number;
  status: string;
  approvedAt: string;
};
