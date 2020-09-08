import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator,ScrollView, TouchableOpacity } from 'react-native';
import { FAB, DataTable } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { dataInRequest, setLocal } from '../../store/modules/local/actions';

import styles from '../Styles/styles';

const List = () => {
    const { loading, locais, errors } = useSelector((state) => state.local);
    const { empresa } = useSelector((state) => state.empresa);
    const dispatch = useDispatch();

    const navigation = useNavigation();

    async function myAsyncEffect() {
        dispatch(dataInRequest({ empresaId: empresa.id }));
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
            {errors.length !== 0 && <Text style={styles.error}>{errors?.erro}</Text>}

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
