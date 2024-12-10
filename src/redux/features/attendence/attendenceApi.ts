import { baseApi } from "../../api/baseApi";

const attendenceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllattendence: builder.query({
      query: (id) => {
        return {
          url: `/attendence/${id}`,
          method: "GET",
        };
      },
      providesTags: ["attendence"],
    }),

    getSingleattendence: builder.query({
      query: (data) => {
        return {
          url: `/attendence/${data.classId}/${data.studentId}`,
          method: "GET",
        };
      },
      providesTags: ["attendence"],
    }),

    addattendence: builder.mutation({
      query: (data) => {
        return {
          url: "/attendence",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["attendence"],
    }),

    deleteattendence: builder.mutation({
      query: (id) => {
        return {
          url: `/attendence/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["attendence"],
    }),
  }),
});

export const {
  useGetAllattendenceQuery,
  useGetSingleattendenceQuery,
  useAddattendenceMutation,
  useDeleteattendenceMutation,
} = attendenceApi;
