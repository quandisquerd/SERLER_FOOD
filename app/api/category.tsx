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
    }),
});
export const {
    useGetProductInCategoryQuery
} = apiCategory;
export const productReducer = apiCategory.reducer;
export default apiCategory;