import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { pause } from "../utils/pause";

const apiProduct = createApi({
    reducerPath: "product",
    tagTypes: ["Product"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api",
        fetchFn: async (...args) => {
            // await pause(1000);
            return fetch(...args);
        },
    }),
    endpoints: (builder) => ({
        getAllProduct: builder.query({
            query: () => "/products",
            providesTags: ["Product"],
        }),
        updateViewProductInCategory: builder.mutation({
            query: ({id,product}:any) => ({
                url: `/product/${id}/updateview/`,
                method: "PATCH",
                body: product,
            }),
            invalidatesTags: ["Product"],
        }),
    }),
});
export const {
    useGetAllProductQuery,
    useUpdateViewProductInCategoryMutation
} = apiProduct;
export const productReducer = apiProduct.reducer;
export default apiProduct;