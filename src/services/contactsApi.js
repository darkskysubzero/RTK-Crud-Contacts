import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactsApi = createApi({
    reducerPath: "contactsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/"
    }),
    tagTypes: ["Contact"],
    endpoints: (builder) => ({
        getAllContacts: builder.query({
            query: () => "contacts",
            providesTags: ["Contact"]
        }),
        getSingleContact: builder.query({
            query: (id) => `contacts/${id}`,
            providesTags: ["Contact"]
        }),
        addContact: builder.mutation({
            query: (newContact) => ({
                url: "contacts",
                method: "POST",
                body: newContact,
                headers: {
                    "Content-type": "application/json"
                }
            }),
            invalidatesTags: ["Contact"]
        }),

        deleteContact: builder.mutation({
            query: (id) => ({
                url: `contacts/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Contact"]
        }),

        updateContact: builder.mutation({
            query: (data) => ({
                url: `contacts/${data.id}`,
                method: "PUT",
                body: { ...data }
            }),
            invalidatesTags: ["Contact"]
        }),


    })
})


export const {
    useGetAllContactsQuery,
    useAddContactMutation,
    useDeleteContactMutation,
    useGetSingleContactQuery,
    useUpdateContactMutation
} = contactsApi; 