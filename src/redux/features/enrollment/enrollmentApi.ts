import { baseApi } from "../../api/baseApi";

const enrollmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllenrollment: builder.query({
      query: () => {
        return {
          url: "/enrolment-student",
          method: "GET",
        };
      },
      providesTags: ["enrollment"],
    }),

    getSingleenrollment: builder.query({
      query: (id) => {
        return {
          url: `/enrolment-student/${id}`,
          method: "GET",
        };
      },
      providesTags: ["enrollment"],
    }),

    addenrollment: builder.mutation({
      query: (data) => {
        return {
          url: "/enrolment-student",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["enrollment"],
    }),

    deleteenrollment: builder.mutation({
      query: (data) => {
        return {
          url: `/enrolment-student`,
          method: "DELETE",
          body: data,
        };
      },
      invalidatesTags: ["enrollment"],
    }),
  }),
});

export const {
  useGetAllenrollmentQuery,
  useGetSingleenrollmentQuery,
  useAddenrollmentMutation,
  useDeleteenrollmentMutation,
} = enrollmentApi;
