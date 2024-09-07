import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { pause } from "../utils/pause";

const apiCategory = createApi({
    reducerPath: "category",
    tagTypes: ["Category"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api",
        fetchFn: async (...args) => {
            // await pause(1000);
            return fetch(...args);
        },
    }),
    endpoints: (builder) => ({
        getProductInCategory: builder.query({
            query: () => "/getproductincategory",
            providesTags: ["Category"],
        }),
        getToppingInProductInCategory: builder.query({
            query: (id: any) => ({
                url: `/product/${id}`,
            }),
            providesTags: ["Category"],
        }),

        updateToppingInProduct: builder.mutation({
            query: ({ id, product }: any) => ({
                url: `product/${id}/update/`,
                method: "PUT",
                body: product,
            }),
            invalidatesTags: ["Category"],
        }),
        getOneProduct: builder.query({
            query: (id: any) => `/products/${id}`,
            providesTags: ["Category"],
        }),
        getAllCategory: builder.query({
            query: (id: any) => `/category`,
            providesTags: ["Category"],
        }),
        createProduct: builder.mutation({
            query: ( data ) => ({
                url: `products/`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Category"],
        }),
        createCategory: builder.mutation({
            query: (data) => ({
                url: `category/`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Category"],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `products/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Category"],
        }),
        removeCategory: builder.mutation({
            query: (id) => ({
                url: `category/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Category"],
        }),
    }),
});
export const {
    useGetProductInCategoryQuery,
    useGetToppingInProductInCategoryQuery,
    useUpdateToppingInProductMutation,
    useGetOneProductQuery,
    useGetAllCategoryQuery,
    useCreateProductMutation,
    useCreateCategoryMutation,
    useDeleteProductMutation,
    useRemoveCategoryMutation,
} = apiCategory;
export const productReducer = apiCategory.reducer;
export default apiCategory;