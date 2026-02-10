import { PRODUCTS_URL } from "../../constant";
import { apiSlice } from "./apiSlice";

export const productApislice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
    }),
  }),
});
export const { useGetProductsQuery, useGetProductDetailsQuery } =
  productApislice;
