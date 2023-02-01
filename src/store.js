import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { contactsApi } from "./services/contactsApi";

export const store = configureStore({
    reducer: {
        "contactsApi": contactsApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(contactsApi.middleware)
})

setupListeners(store.dispatch);