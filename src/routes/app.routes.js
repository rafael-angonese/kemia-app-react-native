import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { useAuth } from '../contexts/auth'

import Home from '../pages/Home'


const HomeStack = createStackNavigator()

const HomeRoutes = () => {

    const { user } = useAuth()

    async function myAsyncEffect() {

        if (user.tipo == 1 || user.tipo == 2) {
            console.log('admins e operador')
            // navigation.navigate('local_select')
        }
        if (user.tipo == 3) {
            console.log('master')
            // navigation.navigate('empresa_select')
        }

    }

    useEffect(() => {
        // myAsyncEffect()
    }, []);

    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={Home} />
        </HomeStack.Navigator>
    )
}

export default HomeRoutes