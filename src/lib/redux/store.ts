import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'

// create a singleton store instance that can be imported anywhere (e.g. api clients)
export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['auth/setUser'],
                // Ignore these paths in the state
                ignoredPaths: ['auth.user'],
            },
        }),
})

// compatibility helper - previously used in ReduxProvider
export const makeStore = () => store

// Infer the type of the store
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
