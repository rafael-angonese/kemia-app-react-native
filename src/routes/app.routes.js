import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from '../contexts/auth';
import Home from '../pages/Home';

import SelectEmpresa from '../pages/Empresa/Select';
import EmpresaList from '../pages/Empresa/List';
import EmpresaNew from '../pages/Empresa/New';
import EmpresaShow from '../pages/Empresa/Show';
import EmpresaEdit from '../pages/Empresa/Edit';

import ConfiguracaoList from '../pages/Configuracao/List';
import ConfiguracaoShow from '../pages/Configuracao/Show';
import ConfiguracaoEdit from '../pages/Configuracao/Edit';

import NotificacaoList from '../pages/Notificacao/List';
import NotificacaoShow from '../pages/Notificacao/Show';

import TarefaList from '../pages/Tarefa/List';
import TarefaNew from '../pages/Tarefa/New';
import TarefaShow from '../pages/Tarefa/Show';

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

import ControleOdList from '../pages/ControleOd/List';
import ControleOdNew from '../pages/ControleOd/New';
import ControleOdShow from '../pages/ControleOd/Show';
import ControleOdEdit from '../pages/ControleOd/Edit';

import ControlePhList from '../pages/ControlePh/List';
import ControlePhNew from '../pages/ControlePh/New';
import ControlePhShow from '../pages/ControlePh/Show';
import ControlePhEdit from '../pages/ControlePh/Edit';

import ControleSsList from '../pages/ControleSs/List';
import ControleSsNew from '../pages/ControleSs/New';
import ControleSsShow from '../pages/ControleSs/Show';
import ControleSsEdit from '../pages/ControleSs/Edit';

import ControleVazaoList from '../pages/ControleVazao/List';
import ControleVazaoNew from '../pages/ControleVazao/New';
import ControleVazaoShow from '../pages/ControleVazao/Show';
import ControleVazaoEdit from '../pages/ControleVazao/Edit';

import ControleTanqueList from '../pages/ControleTanque/List';
import ControleTanqueNew from '../pages/ControleTanque/New';
import ControleTanqueShow from '../pages/ControleTanque/Show';
import ControleTanqueEdit from '../pages/ControleTanque/Edit';

import ControleRotacaoBombaList from '../pages/ControleRotacaoBomba/List';
import ControleRotacaoBombaNew from '../pages/ControleRotacaoBomba/New';
import ControleRotacaoBombaShow from '../pages/ControleRotacaoBomba/Show';
import ControleRotacaoBombaEdit from '../pages/ControleRotacaoBomba/Edit';

import EtaList from '../pages/Eta/List';
import EtaNew from '../pages/Eta/New';
import EtaShow from '../pages/Eta/Show';
import EtaEdit from '../pages/Eta/Edit';

import LagoaList from '../pages/Lagoa/List';
import LagoaNew from '../pages/Lagoa/New';
import LagoaShow from '../pages/Lagoa/Show';
import LagoaEdit from '../pages/Lagoa/Edit';

import PolimentoEtaList from '../pages/PolimentoEta/List';
import PolimentoEtaNew from '../pages/PolimentoEta/New';
import PolimentoEtaShow from '../pages/PolimentoEta/Show';
import PolimentoEtaEdit from '../pages/PolimentoEta/Edit';

import TratamentoEfluenteLagoaList from '../pages/TratamentoEfluenteLagoa/List';
import TratamentoEfluenteLagoaNew from '../pages/TratamentoEfluenteLagoa/New';
import TratamentoEfluenteLagoaShow from '../pages/TratamentoEfluenteLagoa/Show';
import TratamentoEfluenteLagoaEdit from '../pages/TratamentoEfluenteLagoa/Edit';

const HomeStack = createStackNavigator();

const HomeRoutes = () => {
    const { user } = useAuth();

    return (
        <HomeStack.Navigator>
            {/* <HomeStack.Screen name="Home" component={Home} /> */}

            {user.tipo === 'master' && (
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

            <HomeStack.Screen name="Home" component={Home} />

            <HomeStack.Screen
                name="EmpresaList"
                options={{ title: 'Empresas' }}
                component={EmpresaList}
            />
            <HomeStack.Screen
                name="EmpresaNew"
                options={{ title: 'Novo Empresa' }}
                component={EmpresaNew}
            />
            <HomeStack.Screen
                name="EmpresaShow"
                options={{ title: 'Empresa' }}
                component={EmpresaShow}
            />
            <HomeStack.Screen
                name="EmpresaEdit"
                options={{ title: 'Empresa' }}
                component={EmpresaEdit}
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
                name="ConfiguracaoList"
                options={{ title: 'Configurações' }}
                component={ConfiguracaoList}
            />
            <HomeStack.Screen
                name="ConfiguracaoShow"
                options={{ title: 'Configurações' }}
                component={ConfiguracaoShow}
            />
            <HomeStack.Screen
                name="ConfiguracaoEdit"
                options={{ title: 'Configurações' }}
                component={ConfiguracaoEdit}
            />

            <HomeStack.Screen
                name="NotificacaoList"
                options={{ title: 'Notificações' }}
                component={NotificacaoList}
            />
            <HomeStack.Screen
                name="NotificacaoShow"
                options={{ title: 'Notificações' }}
                component={NotificacaoShow}
            />

            <HomeStack.Screen
                name="TarefaList"
                options={{ title: 'Tarefas' }}
                component={TarefaList}
            />
            <HomeStack.Screen
                name="TarefaNew"
                options={{ title: 'Tarefa' }}
                component={TarefaNew}
            />
            <HomeStack.Screen
                name="TarefaShow"
                options={{ title: 'Tarefa' }}
                component={TarefaShow}
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

            <HomeStack.Screen
                name="ControleOdList"
                options={{ title: 'Controle Od' }}
                component={ControleOdList}
            />
            <HomeStack.Screen
                name="ControleOdNew"
                options={{ title: 'Controle Od' }}
                component={ControleOdNew}
            />
            <HomeStack.Screen
                name="ControleOdShow"
                options={{ title: 'Controle Od' }}
                component={ControleOdShow}
            />
            <HomeStack.Screen
                name="ControleOdEdit"
                options={{ title: 'Controle Od' }}
                component={ControleOdEdit}
            />

            <HomeStack.Screen
                name="ControlePhList"
                options={{ title: 'Controle Ph' }}
                component={ControlePhList}
            />
            <HomeStack.Screen
                name="ControlePhNew"
                options={{ title: 'Controle Ph' }}
                component={ControlePhNew}
            />
            <HomeStack.Screen
                name="ControlePhShow"
                options={{ title: 'Controle Ph' }}
                component={ControlePhShow}
            />
            <HomeStack.Screen
                name="ControlePhEdit"
                options={{ title: 'Controle Ph' }}
                component={ControlePhEdit}
            />

            <HomeStack.Screen
                name="ControleSsList"
                options={{ title: 'Controle Ss' }}
                component={ControleSsList}
            />
            <HomeStack.Screen
                name="ControleSsNew"
                options={{ title: 'Controle Ss' }}
                component={ControleSsNew}
            />
            <HomeStack.Screen
                name="ControleSsShow"
                options={{ title: 'Controle Ss' }}
                component={ControleSsShow}
            />
            <HomeStack.Screen
                name="ControleSsEdit"
                options={{ title: 'Controle Ss' }}
                component={ControleSsEdit}
            />

            <HomeStack.Screen
                name="ControleVazaoList"
                options={{ title: 'Controle Vazão' }}
                component={ControleVazaoList}
            />
            <HomeStack.Screen
                name="ControleVazaoNew"
                options={{ title: 'Controle Vazão' }}
                component={ControleVazaoNew}
            />
            <HomeStack.Screen
                name="ControleVazaoShow"
                options={{ title: 'Controle Vazão' }}
                component={ControleVazaoShow}
            />
            <HomeStack.Screen
                name="ControleVazaoEdit"
                options={{ title: 'Controle Vazão' }}
                component={ControleVazaoEdit}
            />

            <HomeStack.Screen
                name="ControleTanqueList"
                options={{ title: 'Controle Tanque' }}
                component={ControleTanqueList}
            />
            <HomeStack.Screen
                name="ControleTanqueNew"
                options={{ title: 'Controle Tanque' }}
                component={ControleTanqueNew}
            />
            <HomeStack.Screen
                name="ControleTanqueShow"
                options={{ title: 'Controle Tanque' }}
                component={ControleTanqueShow}
            />
            <HomeStack.Screen
                name="ControleTanqueEdit"
                options={{ title: 'Controle Tanque' }}
                component={ControleTanqueEdit}
            />

            <HomeStack.Screen
                name="ControleRotacaoBombaList"
                options={{ title: 'Controle Rotação Bomba' }}
                component={ControleRotacaoBombaList}
            />
            <HomeStack.Screen
                name="ControleRotacaoBombaNew"
                options={{ title: 'Controle Rotação Bomba' }}
                component={ControleRotacaoBombaNew}
            />
            <HomeStack.Screen
                name="ControleRotacaoBombaShow"
                options={{ title: 'Controle Rotação Bomba' }}
                component={ControleRotacaoBombaShow}
            />
            <HomeStack.Screen
                name="ControleRotacaoBombaEdit"
                options={{ title: 'Controle Rotação Bomba' }}
                component={ControleRotacaoBombaEdit}
            />

            <HomeStack.Screen
                name="EtaList"
                options={{ title: 'Eta' }}
                component={EtaList}
            />
            <HomeStack.Screen
                name="EtaNew"
                options={{ title: 'Eta' }}
                component={EtaNew}
            />
            <HomeStack.Screen
                name="EtaShow"
                options={{ title: 'Eta' }}
                component={EtaShow}
            />
            <HomeStack.Screen
                name="EtaEdit"
                options={{ title: 'Eta' }}
                component={EtaEdit}
            />

            <HomeStack.Screen
                name="LagoaList"
                options={{ title: 'Lagoa' }}
                component={LagoaList}
            />
            <HomeStack.Screen
                name="LagoaNew"
                options={{ title: 'Lagoa' }}
                component={LagoaNew}
            />
            <HomeStack.Screen
                name="LagoaShow"
                options={{ title: 'Lagoa' }}
                component={LagoaShow}
            />
            <HomeStack.Screen
                name="LagoaEdit"
                options={{ title: 'Lagoa' }}
                component={LagoaEdit}
            />

            <HomeStack.Screen
                name="PolimentoEtaList"
                options={{ title: 'Polimento Eta' }}
                component={PolimentoEtaList}
            />
            <HomeStack.Screen
                name="PolimentoEtaNew"
                options={{ title: 'Polimento Eta' }}
                component={PolimentoEtaNew}
            />
            <HomeStack.Screen
                name="PolimentoEtaShow"
                options={{ title: 'Polimento Eta' }}
                component={PolimentoEtaShow}
            />
            <HomeStack.Screen
                name="PolimentoEtaEdit"
                options={{ title: 'Polimento Eta' }}
                component={PolimentoEtaEdit}
            />

            <HomeStack.Screen
                name="TratamentoEfluenteLagoaList"
                options={{ title: 'Tratamento Efluente Lagoa' }}
                component={TratamentoEfluenteLagoaList}
            />
            <HomeStack.Screen
                name="TratamentoEfluenteLagoaNew"
                options={{ title: 'Tratamento Efluente Lagoa' }}
                component={TratamentoEfluenteLagoaNew}
            />
            <HomeStack.Screen
                name="TratamentoEfluenteLagoaShow"
                options={{ title: 'Tratamento Efluente Lagoa' }}
                component={TratamentoEfluenteLagoaShow}
            />
            <HomeStack.Screen
                name="TratamentoEfluenteLagoaEdit"
                options={{ title: 'Tratamento Efluente Lagoa' }}
                component={TratamentoEfluenteLagoaEdit}
            />
        </HomeStack.Navigator>
    );
};

export default HomeRoutes;
