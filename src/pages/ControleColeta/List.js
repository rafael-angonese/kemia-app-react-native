import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { FAB, DataTable } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../contexts/auth';
import handlingErros from '../../utils/handlingErros';
import formatDate from '../../utils/formatDate';
import api from '../../services/api';
import styles from '../Styles/styles';

const List = () => {
    const { empresa, local } = useAuth();
    const [loading, setLoading] = useState(false);
    const [pastilhaCloro, setPastilhaCloro] = useState([]);
    const [error, setError] = useState('');

    const navigation = useNavigation();

    async function myAsyncEffect() {
        setLoading(true);
        try {
            const response = await api.get(
                `/controle-coletas?localId=${local.id}`
            );
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
        </View>
    );
};

export default List;
