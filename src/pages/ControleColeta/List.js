import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { FAB, DataTable, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useAuth } from '../../contexts/auth';
import handlingErros from '../../utils/handlingErros';
import formatDate from '../../utils/formatDate';
import toQueryString from '../../utils/toQueryString';
import api from '../../services/api';
import styles from '../Styles/styles';

const List = () => {
    const { empresa, local } = useAuth();
    const [loading, setLoading] = useState(false);
    const [pastilhaCloro, setPastilhaCloro] = useState([]);
    const [error, setError] = useState('');

    const [startDate, setStartDate] = useState(Date.now());
    const [endDate, setEndDate] = useState(Date.now());
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);

    const navigation = useNavigation();

    async function myAsyncEffect() {
        setLoading(true);
        try {
            let query = {
                localId: local.id,
                startDate: formatDate(startDate, 'yyyy-MM-dd'),
                endDate: formatDate(endDate, 'yyyy-MM-dd'),
            };
            const params = toQueryString(query);
            const response = await api.get(`/controle-coletas${params}`);
            const { data } = response;
            setPastilhaCloro(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setPastilhaCloro([]);
            const validation = handlingErros(error);
            setError(validation);
        }
    }

    useEffect(() => {
        myAsyncEffect();
    }, []);

    return (
        <View style={{ flex: 1 }}>
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

            <ScrollView>
                <ScrollView
                    horizontal
                    contentContainerStyle={{ width: 500, height: '100%' }}
                >
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Data</DataTable.Title>
                            <DataTable.Title>Status da Coleta</DataTable.Title>
                            <DataTable.Title>
                                Condição da Coleta
                            </DataTable.Title>
                        </DataTable.Header>
                        {pastilhaCloro.map((item, index) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => {
                                    navigation.navigate('ControleColetaShow', {
                                        item: item,
                                        refresh: myAsyncEffect.bind(this),
                                    });
                                }}
                            >
                                <DataTable.Row>
                                    <DataTable.Cell>
                                        {formatDate(item.data)}
                                    </DataTable.Cell>
                                    <DataTable.Cell>
                                        {item.status_coleta == 1
                                            ? 'Realizada'
                                            : 'Adiada'}
                                    </DataTable.Cell>
                                    <DataTable.Cell>
                                        {' '}
                                        {item.condicao_coleta == 1
                                            ? 'Ensoralada'
                                            : item.condicao_coleta == 2
                                            ? 'Chuvoso'
                                            : 'Garoa'}
                                    </DataTable.Cell>
                                </DataTable.Row>
                            </TouchableOpacity>
                        ))}
                    </DataTable>
                </ScrollView>
                {pastilhaCloro.length == 0 && (
                    <Text style={styles.empty}>Desculpa, não há dados!</Text>
                )}
            </ScrollView>

            <FAB
                label="novo"
                style={styles.fab}
                icon="plus"
                onPress={() =>
                    navigation.navigate('ControleColetaNew', {
                        refresh: myAsyncEffect.bind(this),
                    })
                }
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

export default List;
