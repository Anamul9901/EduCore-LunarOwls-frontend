import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAlluser: builder.query({
      query: () => {
        return {
          url: "/users",
          method: "GET",
        };
      },
      providesTags: ["users"],
    }),

    getMyData: builder.query({
      query: () => {
        return {
          url: `/users/me`,
          method: "GET",
        };
      },
      providesTags: ["users"],
    }),

    adduser: builder.mutation({
      query: (data) => {
        return {
          url: "/users",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["users"],
    }),

    updateuser: builder.mutation({
      query: (data) => {
        return {
          url: `/users/me`,
          method: "PATCH",
          body: data?.data,
        };
      },
      invalidatesTags: ["users"],
    }),

    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/users/soft/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAlluserQuery,
  useAdduserMutation,
  useGetMyDataQuery,
  useUpdateuserMutation,
  useDeleteUserMutation,
} = userApi;
