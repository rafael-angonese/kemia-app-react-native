import React, { createContext, useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api'

const AuthConxtex = createContext({})

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadStoragedData() {
            const storagedUser = await AsyncStorage.getItem('@AuthRN:user')
            const storagedToken = await AsyncStorage.getItem('@AuthRN:token')

            if (storagedUser && storagedToken) {
                api.defaults.headers.Authorization = `Bearer ${storagedToken}`

                setUser(JSON.parse(storagedUser))
            }
            setLoading(false)
        }

        loadStoragedData()
    }, [])

    async function signIn(email, password) {

        try {
            const response = await api.post('/authenticate', {
                email: email,
                password: password
            })

            setUser(response.data.user)

            api.defaults.headers.Authorization = `Bearer ${response.data.token}`

            await AsyncStorage.setItem('@AuthRN:user', JSON.stringify(response.data.user))
            await AsyncStorage.setItem('@AuthRN:token', response.data.token)

            return response.data

        } catch (error) {
            return error.response
        }
    }

    async function signOut() {
        await AsyncStorage.clear()
        setUser(null)
    }

    return (
        <AuthConxtex.Provider value={{ signed: !!user, user, signIn, signOut, loading }}>
            {children}
        </AuthConxtex.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthConxtex)

    return context
}