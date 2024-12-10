import { baseApi } from "../../api/baseApi";

const classApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllclassById: builder.query({
      query: (id) => {
        return {
          url: `/class/${id}`,
          method: "GET",
        };
      },
      providesTags: ["class"],
    }),

    addclass: builder.mutation({
      query: (data) => {
        return {
          url: "/class",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["class"],
    }),

    updateclass: builder.mutation({
      query: (data) => {
        return {
          url: `/class/${data?.id}`,
          method: "PATCH",
          body: data?.data,
        };
      },
      invalidatesTags: ["class"],
    }),

    deleteclass: builder.mutation({
      query: (id) => {
        return {
          url: `/class/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["class"],
    }),
  }),
});

export const {
  useGetAllclassByIdQuery,
  useAddclassMutation,
  useUpdateclassMutation,
  useDeleteclassMutation,
} = classApi;
