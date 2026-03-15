'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { store, AppStore } from '@/lib/redux/store'

export default function ReduxProvider({
    children,
}: {
    children: React.ReactNode
}) {
    // singleton store imported directly
    return <Provider store={store}>{children}</Provider>
}
