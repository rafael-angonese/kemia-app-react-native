import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import SelectEmpresa from '../pages/Empresa/Select';

const HomeStack = createStackNavigator();

const HomeRoutes = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={Home} />
        <HomeStack.Screen
            name="SelectEmpresa"
            options={{ title: 'Empresa' }}
            component={SelectEmpresa}
        />
    </HomeStack.Navigator>
);

export default HomeRoutes;
