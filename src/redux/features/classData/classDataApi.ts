import { baseApi } from "../../api/baseApi";

const classDataApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllclassData: builder.query({
      query: (id) => {
        return {
          url: `/class-data/${id}`,
          method: "GET",
        };
      },
      providesTags: ["classData"],
    }),

    addclassData: builder.mutation({
      query: (data) => {
        return {
          url: "/class-data",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["classData"],
    }),

    updateclassData: builder.mutation({
      query: (data) => {
        return {
          url: `/class-data/${data?.id}`,
          method: "PATCH",
          body: data?.data,
        };
      },
      invalidatesTags: ["classData"],
    }),

    deleteclassData: builder.mutation({
      query: (id) => {
        return {
          url: `/class-data/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["classData"],
    }),
  }),
});

export const {
  useGetAllclassDataQuery,
  useAddclassDataMutation,
  useUpdateclassDataMutation,
  useDeleteclassDataMutation,
} = classDataApi;
