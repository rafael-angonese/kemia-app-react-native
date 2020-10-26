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

import EquipamentoList from '../pages/Equipamento/List';
import EquipamentoNew from '../pages/Equipamento/New';
import EquipamentoShow from '../pages/Equipamento/Show';
import EquipamentoEdit from '../pages/Equipamento/Edit';

import EquipamentoManutencaoList from '../pages/EquipamentoManutencao/List';
import EquipamentoManutencaoNew from '../pages/EquipamentoManutencao/New';
import EquipamentoManutencaoShow from '../pages/EquipamentoManutencao/Show';
import EquipamentoManutencaoEdit from '../pages/EquipamentoManutencao/Edit';

import ConcentracaoCloroList from '../pages/ConcentracaoCloro/List';
import ConcentracaoCloroNew from '../pages/ConcentracaoCloro/New';
import ConcentracaoCloroShow from '../pages/ConcentracaoCloro/Show';
import ConcentracaoCloroEdit from '../pages/ConcentracaoCloro/Edit';

import PastilhaCloroList from '../pages/PastilhaCloro/List';
import PastilhaCloroNew from '../pages/PastilhaCloro/New';
import PastilhaCloroShow from '../pages/PastilhaCloro/Show';
import PastilhaCloroEdit from '../pages/PastilhaCloro/Edit';

import ControleColetaList from '../pages/ControleColeta/List';
import ControleColetaNew from '../pages/ControleColeta/New';
import ControleColetaShow from '../pages/ControleColeta/Show';
import ControleColetaEdit from '../pages/ControleColeta/Edit';

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

            <HomeStack.Screen
                name="EquipamentoList"
                options={{ title: 'Equipamentos' }}
                component={EquipamentoList}
            />
            <HomeStack.Screen
                name="EquipamentoNew"
                options={{ title: 'Equipamento' }}
                component={EquipamentoNew}
            />
            <HomeStack.Screen
                name="EquipamentoShow"
                options={{ title: 'Equipamento' }}
                component={EquipamentoShow}
            />
            <HomeStack.Screen
                name="EquipamentoEdit"
                options={{ title: 'Equipamento' }}
                component={EquipamentoEdit}
            />
            <HomeStack.Screen
                name="EquipamentoManutencaoList"
                options={{ title: 'Equipamento em Manutenção' }}
                component={EquipamentoManutencaoList}
            />
            <HomeStack.Screen
                name="EquipamentoManutencaoNew"
                options={{ title: 'Equipamento em Manutenção' }}
                component={EquipamentoManutencaoNew}
            />
            <HomeStack.Screen
                name="EquipamentoManutencaoShow"
                options={{ title: 'Equipamento em Manutenção' }}
                component={EquipamentoManutencaoShow}
            />
            <HomeStack.Screen
                name="EquipamentoManutencaoEdit"
                options={{ title: 'Equipamento em Manutenção' }}
                component={EquipamentoManutencaoEdit}
            />

            <HomeStack.Screen
                name="ConcentracaoCloroList"
                options={{ title: 'Concentração de Cloro' }}
                component={ConcentracaoCloroList}
            />
            <HomeStack.Screen
                name="ConcentracaoCloroNew"
                options={{ title: 'Concentração de Cloro' }}
                component={ConcentracaoCloroNew}
            />
            <HomeStack.Screen
                name="ConcentracaoCloroShow"
                options={{ title: 'Concentração de Cloro' }}
                component={ConcentracaoCloroShow}
            />
            <HomeStack.Screen
                name="ConcentracaoCloroEdit"
                options={{ title: 'Concentração de Cloro' }}
                component={ConcentracaoCloroEdit}
            />

            <HomeStack.Screen
                name="PastilhaCloroList"
                options={{ title: 'Pastilha de Cloro' }}
                component={PastilhaCloroList}
            />
            <HomeStack.Screen
                name="PastilhaCloroNew"
                options={{ title: 'Pastilha de Cloro' }}
                component={PastilhaCloroNew}
            />
            <HomeStack.Screen
                name="PastilhaCloroShow"
                options={{ title: 'Pastilha de Cloro' }}
                component={PastilhaCloroShow}
            />
            <HomeStack.Screen
                name="PastilhaCloroEdit"
                options={{ title: 'Pastilha de Cloro' }}
                component={PastilhaCloroEdit}
            />

            <HomeStack.Screen
                name="ControleColetaList"
                options={{ title: 'Controle Coleta' }}
                component={ControleColetaList}
            />
            <HomeStack.Screen
                name="ControleColetaNew"
                options={{ title: 'Controle Coleta' }}
                component={ControleColetaNew}
            />
            <HomeStack.Screen
                name="ControleColetaShow"
                options={{ title: 'Controle Coleta' }}
                component={ControleColetaShow}
            />
            <HomeStack.Screen
                name="ControleColetaEdit"
                options={{ title: 'Controle Coleta' }}
                component={ControleColetaEdit}
            />
        </HomeStack.Navigator>
    );
};

export default HomeRoutes;
