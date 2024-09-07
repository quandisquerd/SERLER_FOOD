import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { pause } from "../utils/pause";

const apiTopping = createApi({
    reducerPath: "topping",
    tagTypes: ["Topping"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api",
        fetchFn: async (...args) => {
            // await pause(1000);
            return fetch(...args);
        },
    }),
    endpoints: (builder) => ({
        getAllTopping: builder.query({
            query: () => "/gettopping",
            providesTags: ["Topping"],
        }),
        getOneTopping: builder.query({
            query: (id: any) => `/topping/${id}`,
            providesTags: ["Topping"],
        }),
        createSubtoppingInTopping: builder.mutation({
            query: (data) => ({
                url: `createsubtopping/`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Topping"],
        }),
        updateViewSubtoppingInTopping: builder.mutation({
            query: ({id,data}) => ({
                url: `/subtopping/${id}/`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Topping"],
        }),
        updateTopping: builder.mutation({
            query: ({ id, data }) => ({
                url: `/updatetopping/${id}/`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Topping"],
        }),
        removeTopping: builder.mutation({
            query: (id) => ({
                url: `/topping/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Topping"],
        }),
        createTopping: builder.mutation({
            query: ( data) => ({
                url: `/topping/`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Topping"],
        }),
    }),
});
export const {
    useGetAllToppingQuery,
    useGetOneToppingQuery,
    useCreateSubtoppingInToppingMutation,
    useUpdateViewSubtoppingInToppingMutation,
    useUpdateToppingMutation,
    useRemoveToppingMutation,
    useCreateToppingMutation
} = apiTopping;
export const productReducer = apiTopping.reducer;
export default apiTopping;