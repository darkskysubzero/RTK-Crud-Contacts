import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactsApi = createApi({
    reducerPath: "contactsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/"
    }),
    endpoints: (builder) => ({
        getAllContacts: builder.query({
            query: () => "contacts",
        }),

        addContact: builder.mutation({
            query: (newContact) => ({
                url: "contacts",
                method: "POST",
                body: newContact,
                headers: {
                    "Content-type": "application/json"
                }
            })
        })
    })
})


export const { useGetAllContactsQuery, useAddContactMutation } = contactsApi; 