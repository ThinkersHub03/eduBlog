import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { User } from '@supabase/supabase-js'

export type UserRole = 'user' | 'admin'

interface AuthState {
    user: User | null
    role: UserRole | null
    isAuthenticated: boolean
    loading: boolean
}

const initialState: AuthState = {
    user: null,
    role: null,
    isAuthenticated: false,
    loading: true,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: User; role: UserRole }>) => {
            state.user = action.payload.user
            state.role = action.payload.role
            state.isAuthenticated = true
            state.loading = false
        },
        clearUser: (state) => {
            state.user = null
            state.role = null
            state.isAuthenticated = false
            state.loading = false
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
    },
})

export const { setUser, clearUser, setLoading } = authSlice.actions
export default authSlice.reducer
