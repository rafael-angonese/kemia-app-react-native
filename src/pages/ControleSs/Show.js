import React, { Component, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image, ScrollView } from 'react-native';
import { Button, Chip, Paragraph, Dialog, Portal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ImageView from 'react-native-image-view';

import { useAuth } from '../../contexts/auth';
import yupValidator from '../../utils/yupValidator';
import handlingErros from '../../utils/handlingErros';
import formatDate from '../../utils/formatDate';
import api from '../../services/api';
import styles from '../Styles/styles';

import { baseURL } from '../../config/constants';

const Show = ({ route }) => {
    const { refresh } = route.params;
    const { item } = route.params;
    const [error, setError] = useState('');
    const [dialog, setDialog] = useState(false);
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [show_image, setShow_image] = useState(false);

    const images = [
        {
            source: {
                uri: `${baseURL}/controle-sses/${item.id}/image-bruto`,
            },
            title: 'Bruto',
            width: 806,
            height: 720,
        },
        {
            source: {
                uri: `${baseURL}/controle-sses/${item.id}/image-tratado`,
            },
            title: 'Tratado',
            width: 806,
            height: 720,
        },
    ];

    async function excluir() {
        setDialog(false);
        setLoading(true);
        try {
            const response = await api.delete('/controle-sses/' + item.id);
            setLoading(false);
            refresh();
            navigation.navigate('ControleSsList');
        } catch (error) {
            setLoading(false);
            const validation = handlingErros(error);
            setError(validation);
        }
    }

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

            <Text style={styles.title_view}>Controle</Text>
            <Text style={styles.title_view}>de</Text>
            <Text style={styles.title_view}>SS</Text>

            <Text>Data: {formatDate(item.data)}</Text>
            <Text>Hora: {item.hora.slice(0, -3)}</Text>
            <Text>Bruto: {item.bruto}</Text>
            <Text>Reator 1: {item.reator_1}</Text>
            <Text>Reator 2: {item.reator_2}</Text>
            <Text>Reator 3: {item.reator_3}</Text>
            <Text>Tratado: {item.tratado}</Text>
            <Text>Ação Corretiva: {item.acao_corretiva}</Text>

            {(item.efluente_bruto || item.efluente_tratado) && (
                <Button
                    icon="image"
                    style={{ marginTop: 20 }}
                    onPress={() => {
                        setShow_image(true);
                    }}
                >
                    Visualizar Imagem
                </Button>
            )}

            <ImageView
                images={images}
                imageIndex={0}
                isVisible={show_image}
                onClose={() => setShow_image(false)}
            />

            <View style={styles.container_row}>
                <Button
                    style={styles.button_radius}
                    icon="pencil"
                    mode="contained"
                    onPress={() =>
                        navigation.navigate('ControleSsEdit', {
                            item: item,
                            refresh: refresh.bind(this),
                        })
                    }
                >
                    Editar
                </Button>
                <Button
                    style={styles.button_radius}
                    color="red"
                    icon="trash-can"
                    mode="contained"
                    onPress={() => setDialog(true)}
                >
                    Excluir
                </Button>
            </View>

            <Portal>
                <Dialog visible={dialog} onDismiss={() => setDialog(false)}>
                    <Dialog.Title>Excluir</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>
                            Realmente deseja excluir este dado?
                        </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setDialog(false)}>
                            Cancelar
                        </Button>
                        <Button onPress={() => excluir()}>Excluir</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

export default Show;
