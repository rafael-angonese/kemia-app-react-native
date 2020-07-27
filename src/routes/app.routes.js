import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../pages/Home'

const HomeStack = createStackNavigator()

const HomeRoutes = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen  name="Home" component={Home} />
    </HomeStack.Navigator>
)

export default HomeRoutes