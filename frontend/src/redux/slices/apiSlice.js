import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constant";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "User", "Order"],
  endpoints: (builder) => ({}),
});

//API SLICE ->    centralised configuration for ALL API LOGIC.
//NORMAL SLICE->   store data in browser memory. done by redux state
//AUTH-API SLICE->  make api calls to server. done by RTK query
