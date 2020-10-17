import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from '../contexts/auth';
import Home from '../pages/Home';
import SelectEmpresa from '../pages/Empresa/Select';

import SelectLocal from '../pages/Local/Select';
import LocalList from '../pages/Local/List';
import LocalNew from '../pages/Local/New';
import LocalShow from '../pages/Local/Show';
import LocalEdit from '../pages/Local/Edit';

const HomeStack = createStackNavigator();

const HomeRoutes = () => {
    const { user } = useAuth();

    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={Home} />

            {user?.tipo === 'master' && (
                <HomeStack.Screen
                    name="SelectEmpresa"
                    options={{ title: 'Empresa' }}
                    component={SelectEmpresa}
                />
            )}
            <HomeStack.Screen
                name="SelectLocal"
                options={{ title: 'Local' }}
                component={SelectLocal}
            />
            <HomeStack.Screen
                name="LocalList"
                options={{ title: 'Locais' }}
                component={LocalList}
            />
            <HomeStack.Screen
                name="LocalNew"
                options={{ title: 'Novo local' }}
                component={LocalNew}
            />
            <HomeStack.Screen
                name="LocalShow"
                options={{ title: 'Local' }}
                component={LocalShow}
            />
            <HomeStack.Screen
                name="LocalEdit"
                options={{ title: 'Local' }}
                component={LocalEdit}
            />
            {/* <HomeStack.Screen name="Home" component={Home} /> */}
        </HomeStack.Navigator>
    );
};

export default HomeRoutes;
