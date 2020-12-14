import React, { useEffect } from 'react';
import { View } from 'react-native';
import { List, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import OneSignal from 'react-native-onesignal';

import { useAuth } from '../../contexts/auth';

const Admin = (props) => {
    const { logout, user } = useAuth();
    const navigation = useNavigation();

    async function onReceived(notification) {
        console.log('Notification received: ', notification);
    }

    async function onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
    }

    async function onIds(device) {
        console.log('Device info: ', device);
    }

    useEffect(() => {
        OneSignal.init('9f97a338-065f-45f2-8c29-75af67c161b2');
        OneSignal.addEventListener('received', onReceived);
        OneSignal.addEventListener('opened', onOpened);
        OneSignal.addEventListener('ids', onIds);
    }, []);

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
                title="Notificações"
                description=""
                left={(props) => <List.Icon {...props} icon="bell" />}
                onPress={() => {
                    navigation.navigate('NotificacaoList');
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
                title="ETA"
                description="Estações de Tratamento de Água"
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
                description="Controle de Equipamentos em Manutenção"
                left={(props) => (
                    <List.Icon {...props} icon="robot-industrial" />
                )}
                onPress={() => {
                    navigation.navigate('EquipamentoManutencaoList');
                }}
            />
            <List.Item
                title="Polimento com ETA"
                description="Polimento com ETAs"
                left={(props) => (
                    <List.Icon {...props} icon="robot-industrial" />
                )}
                onPress={() => {
                    navigation.navigate('PolimentoEtaList');
                }}
            />
            <List.Item
                title="Tratamento Efluente Lagoa"
                description="Tratamento de Efluente com Lagoa"
                left={(props) => (
                    <List.Icon {...props} icon="robot-industrial" />
                )}
                onPress={() => {
                    navigation.navigate('TratamentoEfluenteLagoaList');
                }}
            />
            <List.Item
                title="Controle Concentração de Cloro"
                description="Controle de Concentração de Cloro"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('ConcentracaoCloroList');
                }}
            />
            <List.Item
                title="Controle Pastilha de Cloro"
                description="Controle de Pastilha de Cloro"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('PastilhaCloroList');
                }}
            />
            <List.Item
                title="Controle de Coletas"
                description="Planilha de Controle de Coleta"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('ControleColetaList');
                }}
            />
            <List.Item
                title="Controle de OD"
                description="Planilha de Controle de OD"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('ControleOdList');
                }}
            />
            <List.Item
                title="Controle de SS"
                description="Planilha de Controle de SS"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('ControleSsList');
                }}
            />
            <List.Item
                title="Controle de pH"
                description="Planilha de Controle de pH"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('ControlePhList');
                }}
            />
            <List.Item
                title="Controle de Vazão"
                description="Planilha de Controle de Vazão"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('ControleVazaoList');
                }}
            />
            <List.Item
                title="Controle de Tanques"
                description="Planilha de Controle de Tanques"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('ControleTanqueList');
                }}
            />
            <List.Item
                title="Controle de Rotação da Bomba"
                description="Planilha de Controle de Rotação da Bomba"
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
