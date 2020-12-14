import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { List, Menu, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import formatDate from '../../utils/formatDate';
import { useAuth } from '../../contexts/auth';
import styles from '../Styles/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import handlingErros from '../../utils/handlingErros';
import toQueryString from '../../utils/toQueryString';
import api from '../../services/api';

const Operator = (props) => {
    const { logout, user, local } = useAuth();
    const navigation = useNavigation();

    const [startDate, setStartDate] = useState(Date.now());
    const [endDate, setEndDate] = useState(Date.now());
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);

    const [loading, setLoading] = useState(false);
    const [tarefas, setTarefas] = useState([]);
    const [error, setError] = useState('');

    const polimentoEtaExists = tarefas.some(
        (tarefa) => tarefa.atividade === 'POLIMENTO-ETA'
    );

    async function myAsyncEffect() {
        setLoading(true);
        try {
            let query = {
                localId: local.id,
                userId: user.id,
                startDate: formatDate(startDate, 'yyyy-MM-dd'),
                endDate: formatDate(endDate, 'yyyy-MM-dd'),
            };
            const params = toQueryString(query);

            const response = await api.get(`/tarefas/operador${params}`);
            const { data } = response;
            setError('');
            console.log(data);
            setTarefas(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setTarefas([]);
            const validation = handlingErros(error);
            setError(validation);
        }
    }

    useEffect(() => {
        if (!user) return;
        if (!local) return;

        myAsyncEffect();
    }, [local, user]);

    return (
        <View>
            <ActivityIndicator
                style={
                    loading === true ? { display: 'flex' } : { display: 'none' }
                }
                size="large"
                color="#0000ff"
            />
            {error.length !== 0 && (
                <Text style={styles.error}>{error?.error}</Text>
            )}
            <View style={styles.container_data}>
                <Button icon="calendar" onPress={() => setShowStartDate(true)}>
                    {formatDate(startDate)}
                </Button>
                <Text>Até</Text>
                <Button icon="calendar" onPress={() => setShowEndDate(true)}>
                    {formatDate(endDate)}
                </Button>

                <Button
                    icon="filter"
                    mode="contained"
                    onPress={() => myAsyncEffect()}
                >
                    Filtrar
                </Button>
            </View>
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

            {tarefas.some((tarefa) => tarefa.atividade === 'POLIMENTO-ETA') && (
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
            )}
            {tarefas.some(
                (tarefa) => tarefa.atividade === 'TRATAMENTO-EFLUENTE-LAGOA'
            ) && (
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
            )}
            {tarefas.some(
                (tarefa) => tarefa.atividade === 'CONTROLE-CONCENTRACAO-CLORO'
            ) && (
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
            )}
            {tarefas.some(
                (tarefa) => tarefa.atividade === 'CONTROLE-PASTILHA-CLORO'
            ) && (
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
            )}
            {tarefas.some(
                (tarefa) => tarefa.atividade === 'CONTROLE-COLETA'
            ) && (
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
            )}
            {tarefas.some((tarefa) => tarefa.atividade === 'CONTROLE-OD') && (
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
            )}
            {tarefas.some((tarefa) => tarefa.atividade === 'CONTROLE-SS') && (
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
            )}
            {tarefas.some((tarefa) => tarefa.atividade === 'CONTROLE-PH') && (
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
            )}
            {tarefas.some(
                (tarefa) => tarefa.atividade === 'CONTROLE-VAZAO'
            ) && (
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
            )}
            {tarefas.some(
                (tarefa) => tarefa.atividade === 'CONTROLE-TANQUE'
            ) && (
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
            )}
            {tarefas.some(
                (tarefa) => tarefa.atividade === 'CONTROLE-BOMBA'
            ) && (
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
            )}
            <List.Item
                title="Sair"
                description=""
                left={(props) => <List.Icon {...props} icon="logout" />}
                onPress={() => {
                    logout();
                }}
            />

            {showStartDate && (
                <DateTimePicker
                    value={startDate}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={(event, date) => {
                        setShowStartDate(false);
                        setStartDate(date);
                    }}
                />
            )}

            {showEndDate && (
                <DateTimePicker
                    value={endDate}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={(event, date) => {
                        setShowEndDate(false);
                        setEndDate(date);
                    }}
                />
            )}
        </View>
    );
};

export default Operator;
