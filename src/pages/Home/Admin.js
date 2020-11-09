import React from 'react';
import { View } from 'react-native';
import { List, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../contexts/auth';

const Admin = (props) => {
    const { logout, user } = useAuth();
    const navigation = useNavigation();

    return (
        <View>
            {user?.tipo === 'master' && (
                <List.Item
                    title="Empresas"
                    description=""
                    left={(props) => (
                        <List.Icon {...props} icon="city-variant" />
                    )}
                    onPress={() => {
                        navigation.navigate('EmpresaList');
                    }}
                />
            )}
            <List.Item
                title="Configurações"
                description=""
                left={(props) => <List.Icon {...props} icon="cogs" />}
                onPress={() => {
                    navigation.navigate('ConfiguracaoList');
                }}
            />
            <List.Item
                title="Usuários"
                description=""
                left={(props) => <List.Icon {...props} icon="account" />}
                onPress={() => {
                    navigation.navigate('UsuarioList');
                }}
            />
            <List.Item
                title="Locais"
                description=""
                left={(props) => <List.Icon {...props} icon="flag" />}
                onPress={() => {
                    navigation.navigate('LocalList');
                }}
            />
            <List.Item
                title="Tarefas"
                description="agenda de tarefas"
                left={(props) => <List.Icon {...props} icon="calendar-text" />}
                onPress={() => {
                    navigation.navigate('TarefaList');
                }}
            />
            <List.Item
                title="Tanques"
                description=""
                left={(props) => <List.Icon {...props} icon="engine" />}
                onPress={() => {
                    navigation.navigate('TanqueList');
                }}
            />
            <List.Item
                title="Lagoa"
                description=""
                left={(props) => <List.Icon {...props} icon="docker" />}
                onPress={() => {
                    navigation.navigate('LagoaList');
                }}
            />
            <List.Item
                title="Eta"
                description="Estações de tratamento de água"
                left={(props) => <List.Icon {...props} icon="engine" />}
                onPress={() => {
                    navigation.navigate('EtaList');
                }}
            />
            <List.Item
                title="Equipamentos"
                description=""
                left={(props) => (
                    <List.Icon {...props} icon="robot-industrial" />
                )}
                onPress={() => {
                    navigation.navigate('EquipamentoList');
                }}
            />
            <List.Item
                title="Equipamentos em Manutenção"
                description="controle de equipamentos em manutenção"
                left={(props) => (
                    <List.Icon {...props} icon="robot-industrial" />
                )}
                onPress={() => {
                    navigation.navigate('EquipamentoManutencaoList');
                }}
            />
            <List.Item
                title="Polimento com ETA"
                description="polimento com etas"
                left={(props) => (
                    <List.Icon {...props} icon="robot-industrial" />
                )}
                onPress={() => {
                    navigation.navigate('PolimentoEtaList');
                }}
            />
            <List.Item
                title="Tratamento Efluente Lagoa"
                description="Tratamento Efluente Lagoa"
                left={(props) => (
                    <List.Icon {...props} icon="robot-industrial" />
                )}
                onPress={() => {
                    navigation.navigate('TratamentoEfluenteLagoaList');
                }}
            />
            <List.Item
                title="Controle Concentração de Cloro"
                description="controle de concentração de cloro"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('ConcentracaoCloroList');
                }}
            />
            <List.Item
                title="Controle Pastilha de Cloro"
                description="controle de pastilha de cloro"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('PastilhaCloroList');
                }}
            />
            <List.Item
                title="Controle de Coletas"
                description="planilha de controle de coleta"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('ControleColetaList');
                }}
            />
            <List.Item
                title="Controle de OD"
                description="planilha de controle de OD"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('ControleOdList');
                }}
            />
            <List.Item
                title="Controle de Ss"
                description="planilha de controle de Ss"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('ControleSsList');
                }}
            />
            <List.Item
                title="Controle de PH"
                description="planilha de controle de PH"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('ControlePhList');
                }}
            />
            <List.Item
                title="Controle de Vazão"
                description="planilha de controle de Vazão"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('ControleVazaoList');
                }}
            />
            <List.Item
                title="Controle de Tanques"
                description="planilha de controle de tanques"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('ControleTanqueList');
                }}
            />
            <List.Item
                title="Controle de Rotação da Bomba"
                description="planilha de controle de rotação da bomba"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('ControleRotacaoBombaList');
                }}
            />
            <List.Item
                title="Sair"
                description=""
                left={(props) => <List.Icon {...props} icon="logout" />}
                onPress={() => {
                    logout();
                }}
            />
        </View>
    );
};

export default Admin;
