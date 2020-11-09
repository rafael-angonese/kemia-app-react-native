import React, { Component, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Button, Chip, Paragraph, Dialog, Portal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import styles from '../Styles/styles';

const Show = ({ route }) => {
    const { refresh } = route.params;
    const { item } = route.params;
    const [error, setError] = useState('');
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);

    return (
        <View style={styles.container}>
            <ActivityIndicator
                style={
                    loading == true ? { display: 'flex' } : { display: 'none' }
                }
                size="large"
                color="#0000ff"
            />
            {error.length !== 0 && (
                <Text style={styles.error}>{error?.error}</Text>
            )}

            <Text style={styles.title_view}>Detalhes da Configuração</Text>
            <Text>Tipo: {item.tipo}</Text>
            <Text></Text>
            <Text>Bruto Mínimo: {item.bruto_min}</Text>
            <Text>Bruto Máximo: {item.bruto_max}</Text>
            <Text></Text>
            <Text>Reator 1 Mínimo: {item.reator1_min}</Text>
            <Text>Reator 1 Máximo: {item.reator1_max}</Text>
            <Text></Text>
            <Text>Reator 2 Mínimo: {item.reator2_min}</Text>
            <Text>Reator 2 Máximo: {item.reator2_max}</Text>
            <Text></Text>
            <Text>Reator 3 Mínimo: {item.reator3_min}</Text>
            <Text>Reator 3 Máximo: {item.reator3_max}</Text>
            <Text></Text>
            <Text>Tratado Mínimo: {item.tratado_min}</Text>
            <Text>Tratado Máximo: {item.tratado_max}</Text>

            <View style={styles.container_row}>
                <Button
                    style={styles.button_radius}
                    icon="pencil"
                    mode="contained"
                    onPress={() =>
                        navigation.navigate('ConfiguracaoEdit', {
                            item: item,
                            refresh: refresh.bind(this),
                        })
                    }
                >
                    Editar
                </Button>
            </View>

        </View>
    );
};

export default Show;
