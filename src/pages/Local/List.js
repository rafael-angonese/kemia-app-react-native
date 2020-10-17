import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator,ScrollView, TouchableOpacity } from 'react-native';
import { FAB, DataTable } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../contexts/auth';
import handlingErros from '../../utils/handlingErros';
import api from '../../services/api';
import styles from '../Styles/styles';

const List = () => {
    const { empresa } = useAuth();
    const [loading, setLoading] = useState(false);
    const [locais, setLocais] = useState([]);
    const [error, setError] = useState('');

    const navigation = useNavigation();

    async function myAsyncEffect() {
        setLoading(true);
        try {
            const response = await api.get(`/locais?empresaId=${empresa.id}`)
            const { data } = response;
            setLocais(data)
            setLoading(false);

        } catch (error) {
            setLoading(false);
            setLocais([])
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
            {error.length !== 0 && <Text style={styles.error}>{error?.error}</Text>}

            <ScrollView>
                <ScrollView
                    horizontal
                    contentContainerStyle={{ width: 500, height: '100%' }}
                >
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Nome</DataTable.Title>
                            <DataTable.Title>Endereço</DataTable.Title>
                            <DataTable.Title>Descrição</DataTable.Title>
                        </DataTable.Header>
                        {locais.map((item, index) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => {
                                    navigation.navigate('LocalShow', {
                                        item: item,
                                        refresh: myAsyncEffect.bind(this),
                                    });
                                }}
                            >
                                <DataTable.Row>
                                    <DataTable.Cell>{item.nome}</DataTable.Cell>
                                    <DataTable.Cell>
                                        {item.endereco}
                                    </DataTable.Cell>
                                    <DataTable.Cell>
                                        {item.descricao}
                                    </DataTable.Cell>
                                </DataTable.Row>
                            </TouchableOpacity>
                        ))}
                    </DataTable>
                </ScrollView>
                {locais.length == 0 && (
                    <Text style={styles.empty}>Desculpa, não há dados!</Text>
                )}
            </ScrollView>

            <FAB
                label="novo"
                style={styles.fab}
                icon="plus"
                onPress={() =>
                    navigation.navigate('LocalNew', {
                        refresh: myAsyncEffect.bind(this),
                    })
                }
            />
        </View>
    );
};

export default List;
