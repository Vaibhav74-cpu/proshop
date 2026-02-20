import { ORDERS_URL, PAYPAL_URL } from "../../constant";
import { apiSlice } from "./apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDERS_URL}`,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      //for mark order as paid
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: { ...details }, //payment details
      }),
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url: `${PAYPAL_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
  useGetMyOrdersQuery,
} = orderApiSlice;

/*
      orderId: "123", 
  details: {
    id: "PAYID-ABC123",
    status: "COMPLETED",
    payer: { email_address: "buyer@test.com" }
      */
