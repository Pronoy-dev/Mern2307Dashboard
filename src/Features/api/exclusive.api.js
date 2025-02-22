import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const exclusiveApi = createApi({
  reducerPath: "exclusive",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1" }),
  tagTypes: ["banner"],
  endpoints: (builder) => ({
    uploadBanner: builder.mutation({
      query: (banneruploadData) => ({
        url: `/banner`,
        method: "POST",
        body: banneruploadData,
      }),
      invalidatesTags: ["banner"],
    }),
    getAllBanner: builder.query({
      query: () => `/banner`,
      providesTags: ["banner"],
    }),
    updateBanner: builder.mutation({
      query: (data) => {
        const from = new FormData();
        from.append("title", data.title);
        from.append("image", data.image);
        return {
          url: `/banner/${data.id}`,
          method: "put",
          body: from,
        };
      },
      invalidatesTags: ["banner"],
    }),
    DeleteBanner: builder.mutation({
      query: (id) => ({
        url: `/banner/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["banner"],
    }),
  }),
});

export const {
  useUploadBannerMutation,
  useGetAllBannerQuery,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = exclusiveApi;
