import { baseApi } from "../../api/baseApi";

const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourse: builder.query({
      query: () => {
        return {
          url: "/courses",
          method: "GET",
        };
      },
      providesTags: ["course"],
    }),

    getSingleCourse: builder.query({
      query: (id) => {
        return {
          url: `/courses/${id}`,
          method: "GET",
        };
      },
      providesTags: ["course"],
    }),

    addCourse: builder.mutation({
      query: (data) => {
        return {
          url: "/courses",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["course"],
    }),

    updateCourse: builder.mutation({
      query: (data) => {
        return {
          url: `/courses/${data?.id}`,
          method: "PATCH",
          body: data?.data,
        };
      },
      invalidatesTags: ["course"],
    }),

    finishedCourse: builder.mutation({
      query: (data) => {
        return {
          url: `/courses/complite/${data?.id}`,
          method: "PATCH",
          body: data?.data,
        };
      },
      invalidatesTags: ["course"],
    }),

    deleteCourse: builder.mutation({
      query: (id) => {
        return {
          url: `/courses/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["course"],
    }),
  }),
});

export const {
  useGetAllCourseQuery,
  useGetSingleCourseQuery,
  useAddCourseMutation,
  useUpdateCourseMutation,
  useFinishedCourseMutation,
  useDeleteCourseMutation,
} = courseApi;
