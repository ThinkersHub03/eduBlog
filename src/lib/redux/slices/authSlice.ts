import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { User } from '@supabase/supabase-js'

export type UserRole = 'user' | 'admin'

interface AuthState {
    user: User | null
    role: UserRole | null
    accessToken: string | null
    isAuthenticated: boolean
    loading: boolean
}

const initialState: AuthState = {
    user: null,
    role: null,
    accessToken: null,
    isAuthenticated: false,
    loading: true,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // called after successful login/refresh; sets user and token
        setCredentials: (
            state,
            action: PayloadAction<{ user: User; role: UserRole; accessToken: string }>
        ) => {
            state.user = action.payload.user
            state.role = action.payload.role
            state.accessToken = action.payload.accessToken
            state.isAuthenticated = true
            state.loading = false
        },
        updateAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload
        },
        logout: (state) => {
            state.user = null
            state.role = null
            state.accessToken = null
            state.isAuthenticated = false
            state.loading = false
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
    },
})

export const {
    setCredentials,
    updateAccessToken,
    logout,
    setLoading,
} = authSlice.actions
export default authSlice.reducer
