import axios from 'axios'
import { store } from '@/lib/redux/store'
import { updateAccessToken, logout } from '@/lib/redux/slices/authSlice'

/**
 * Call the backend refresh endpoint (which should read the http-only cookie)
 * and return a new access token.  On success the Redux store is updated.
 * If the refresh fails (expired refresh token, network error, etc.) the user
 * is logged out via the auth slice.
 */
export async function refreshToken(): Promise<string> {
    try {
        const response = await axios.post(
            '/api/auth/refresh',
            {},
            {
                withCredentials: true, // send cookie
            }
        )

        const { accessToken } = response.data as { accessToken: string }

        if (!accessToken) {
            throw new Error('Refresh endpoint did not return accessToken')
        }

        // update redux so that future requests use the new token
        store.dispatch(updateAccessToken(accessToken))
        return accessToken
    } catch (err) {
        // refreshing failed: clear client state and propagate error
        store.dispatch(logout())
        throw err
    }
}
