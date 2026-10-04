export interface ICreatePaymentPayload {
    planId : string
}

export interface createPaymentResponse {
    bkash: string
}



export interface myPaymentResponse {
  id: string
  planId: string
  managerId: string
  subscriptionId: string
  amount: string
  currency: string
  status: string
  provider: string
  transactionId: string
  paidAt: string
  merchantInvoiceNumber: string
  bkashPaymentId: string
  bkashTrxId: string
  payerReference: string
  refundTrxId: any
  refundAmount: any
  refundReason: any
  refundedAt: any
  createdAt: string
  updatedAt: string
  manager: Manager
  subscription: Subscription
}

export interface Manager {
  email: string
  name: string
}

export interface Subscription {
  status: string
  startDate: string
  endDate: string
}
