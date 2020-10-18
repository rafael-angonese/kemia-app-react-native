import React from 'react';
import { View } from 'react-native';
import { List, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Admin = (props) => {
    const navigation = useNavigation();

    return (
        <View>
            {/* <List.Item
                title="Configurações"
                description="configurações"
                left={props => <List.Icon {...props} icon="cogs" />}
                onPress={() => {
                    navigation.navigate('configuracao_list')
                }}
            />
            */}
            <Menu.Item
                icon="account"
                onPress={() => {
                    navigation.navigate('UsuarioList');
                }}
                title="Usuários"
            />
            <Menu.Item
                icon="flag"
                onPress={() => {
                    navigation.navigate('LocalList');
                }}
                title="Locais"
            />
            {/* <List.Item
                title="Tarefas"
                description="agenda de tarefas"
                left={props => <List.Icon {...props} icon="calendar-text" />}
                onPress={() => {
                    navigation.navigate('agenda_list')
                }}
            /> */}
            <Menu.Item
                icon="engine"
                onPress={() => {
                    navigation.navigate('TanqueList');
                }}
                title="Tanques"
            />
            <List.Item
                title="Equipamentos"
                // description="esquipamentos"
                left={(props) => (
                    <List.Icon {...props} icon="robot-industrial" />
                )}
                onPress={() => {
                    navigation.navigate('equipamento_list');
                }}
            />
            {/* <List.Item
                title="Etas"
                description="Estações de tratamento de água"
                left={props => <List.Icon {...props} icon="engine" />}
                onPress={() => {
                    navigation.navigate('eta_list')
                }}
            />
            <List.Item
                title="Lagoas"
                description="Lagoas"
                left={props => <List.Icon {...props} icon="docker" />}
                onPress={() => {
                    navigation.navigate('lagoa_list')
                }}
            /> */}
            <List.Item
                title="Equipamentos em Manutenção"
                description="controle de equipamentos em manutenção"
                left={(props) => (
                    <List.Icon {...props} icon="robot-industrial" />
                )}
                onPress={() => {
                    navigation.navigate('equipamento_manutencao_list');
                }}
            />
            <List.Item
                title="Controle Concentração de Cloro"
                description="controle de concentração de cloro"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('controle_concentracao_cloro_list');
                }}
            />
            <List.Item
                title="Controle Pastilha de Cloro"
                description="controle de pastilha de cloro"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('controle_pastilha_cloro_list');
                }}
            />
            <List.Item
                title="Controle de Coletas"
                description="planilha de controle de coleta"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('controle_coleta_list');
                }}
            />
            <List.Item
                title="Controle de OD"
                description="planilha de controle de OD"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('controle_od_list');
                }}
            />
            <List.Item
                title="Controle de SS"
                description="planilha de controle de SS"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('controle_ss_list');
                }}
            />
            <List.Item
                title="Controle de PH"
                description="planilha de controle de PH"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('controle_ph_list');
                }}
            />
            <List.Item
                title="Controle de Vazão"
                description="planilha de controle de Vazão"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('controle_vazao_list');
                }}
            />
            <List.Item
                title="Controle de Tanques"
                description="planilha de controle de tanques"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('controle_tanque_list');
                }}
            />
            <List.Item
                title="Controle de Rotação da Bomba"
                description="planilha de controle de rotação da bomba"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('controle_bomba_list');
                }}
            />
        </View>
    );
};

export default Admin;
