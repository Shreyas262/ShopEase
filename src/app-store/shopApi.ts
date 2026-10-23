import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Product, ProductsResponse } from "../types/product"

const shopApi = createApi({
    reducerPath: "shopApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://dummyjson.com",
    }),
    tagTypes: ["Product"],
    endpoints: (builder) => ({
        getProducts: builder.query<ProductsResponse, void>({
            // DummyJSON returns only 30 items by default; limit=0 returns the full catalog.
            query: () => "/products?limit=0",
            providesTags: (result) => result ? [
                            ...result.products.map(({ id }) => ({ type: "Product" as const, id })),
                            {type: "Product" as const, id: "LIST"}
                        ] :
                        [{type: "Product" as const, id: "LIST"}],
        }),
        getProduct: builder.query<Product, number>({
            query: (productId) => `/products/${productId}`,
            providesTags: (result) => result ? [{type: "Product", id: result.id}] : []
        })
    }),
    refetchOnFocus: true,
    refetchOnReconnect: true,
})

export default shopApi
export const { useGetProductsQuery, useGetProductQuery } = shopApi