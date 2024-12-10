import { baseApi } from "../../api/baseApi";

const gradeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllgrade: builder.query({
      query: (id) => {
        return {
          url: `/grade/${id}`,
          method: "GET",
        };
      },
      providesTags: ["grade"],
    }),

    getSinglegrade: builder.query({
      query: (data) => {
        return {
          url: `/grade/${data.studentId}/${data.courseId}`,
          method: "GET",
        };
      },
      providesTags: ["grade"],
    }),

    addgrade: builder.mutation({
      query: (data) => {
        return {
          url: "/grade",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["grade"],
    }),

    deletegrade: builder.mutation({
      query: (id) => {
        return {
          url: `/grade/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["grade"],
    }),
  }),
});

export const {
  useGetAllgradeQuery,
  useGetSinglegradeQuery,
  useAddgradeMutation,
  useDeletegradeMutation,
} = gradeApi;
