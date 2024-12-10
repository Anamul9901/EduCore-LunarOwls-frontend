import { baseApi } from "../../api/baseApi";

const facultyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFaculty: builder.query({
      query: () => {
        return {
          url: "/courses-faculty",
          method: "GET",
        };
      },
      providesTags: ["faculty"],
    }),

    getSingleFaculty: builder.query({
      query: (id) => {
        return {
          url: `/courses-faculty/${id}`,
          method: "GET",
        };
      },
      providesTags: ["faculty"],
    }),

    addFaculty: builder.mutation({
      query: (data) => {
        return {
          url: "/courses-faculty",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["faculty"],
    }),
  }),
});

export const {
  useGetAllFacultyQuery,
  useGetSingleFacultyQuery,
  useAddFacultyMutation,
} = facultyApi;
