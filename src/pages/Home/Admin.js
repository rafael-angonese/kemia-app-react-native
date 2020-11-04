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
                title="Eta"
                description="etas"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('EtaList');
                }}
            />
            <List.Item
                title="Lagoa"
                description="lagoas"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('LagoaList');
                }}
            />
            <Menu.Item
                icon="robot-industrial"
                onPress={() => {
                    navigation.navigate('EquipamentoList');
                }}
                title="Equipamentos"
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
                title="Controle de SS"
                description="planilha de controle de SS"
                left={(props) => (
                    <List.Icon {...props} icon="format-list-checks" />
                )}
                onPress={() => {
                    navigation.navigate('controle_ss_list');
                }}
            />
        </View>
    );
};

export default Admin;
