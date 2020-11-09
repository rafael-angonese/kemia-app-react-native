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
import api from '../../services/api';
import styles from '../Styles/styles';

const List = () => {
    const { empresa, local } = useAuth();
    const [loading, setLoading] = useState(false);
    const [configuracao, setConfiguracao] = useState([]);
    const [error, setError] = useState('');

    const navigation = useNavigation();

    async function myAsyncEffect() {
        setLoading(true);
        try {
            const response = await api.get(`/configuracaos?empresaId=${empresa.id}`);
            const { data } = response;
            setConfiguracao(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setConfiguracao([]);
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
                            <DataTable.Title>Tipo</DataTable.Title>
                        </DataTable.Header>
                        {configuracao.map((item, index) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => {
                                    navigation.navigate('ConfiguracaoShow', {
                                        item: item,
                                        refresh: myAsyncEffect.bind(this),
                                    });
                                }}
                            >
                                <DataTable.Row>
                                    <DataTable.Cell>{item.tipo}</DataTable.Cell>
                                </DataTable.Row>
                            </TouchableOpacity>
                        ))}
                    </DataTable>
                </ScrollView>
                {configuracao.length == 0 && (
                    <Text style={styles.empty}>Desculpa, não há dados!</Text>
                )}
            </ScrollView>
        </View>
    );
};

export default List;
