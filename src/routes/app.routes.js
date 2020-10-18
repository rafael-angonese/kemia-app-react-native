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

import UsuarioList from '../pages/Usuario/List';
import UsuarioNew from '../pages/Usuario/New';
import UsuarioShow from '../pages/Usuario/Show';
import UsuarioEdit from '../pages/Usuario/Edit';

import TanqueList from '../pages/Tanque/List';
import TanqueNew from '../pages/Tanque/New';
import TanqueShow from '../pages/Tanque/Show';
import TanqueEdit from '../pages/Tanque/Edit';

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

            <HomeStack.Screen
                name="UsuarioList"
                options={{ title: 'Usuários' }}
                component={UsuarioList}
            />
            <HomeStack.Screen
                name="UsuarioNew"
                options={{ title: 'Usuário' }}
                component={UsuarioNew}
            />
            <HomeStack.Screen
                name="UsuarioShow"
                options={{ title: 'Usuário' }}
                component={UsuarioShow}
            />
            <HomeStack.Screen
                name="UsuarioEdit"
                options={{ title: 'Usuário' }}
                component={UsuarioEdit}
            />

            <HomeStack.Screen
                name="TanqueList"
                options={{ title: 'Tanques' }}
                component={TanqueList}
            />
            <HomeStack.Screen
                name="TanqueNew"
                options={{ title: 'Tanque' }}
                component={TanqueNew}
            />
            <HomeStack.Screen
                name="TanqueShow"
                options={{ title: 'Tanque' }}
                component={TanqueShow}
            />
            <HomeStack.Screen
                name="TanqueEdit"
                options={{ title: 'Tanque' }}
                component={TanqueEdit}
            />

            {/* <HomeStack.Screen name="Home" component={Home} /> */}
        </HomeStack.Navigator>
    );
};

export default HomeRoutes;
