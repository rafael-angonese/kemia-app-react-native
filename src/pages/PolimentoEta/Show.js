import React, { Component, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Button, Chip, Paragraph, Dialog, Portal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ImageView from 'react-native-image-view';

import { useAuth } from '../../contexts/auth';
import yupValidator from '../../utils/yupValidator';
import handlingErros from '../../utils/handlingErros';
import api from '../../services/api';
import styles from '../Styles/styles';
import { baseURL } from '../../config/constants';

const Show = ({ route }) => {
    const { refresh } = route.params;
    const { item } = route.params;
    const [error, setError] = useState('');
    const [dialog, setDialog] = useState(false);
    const navigation = useNavigation();
    const [images, setImages] = useState([]);
    const [show_image, setShow_image] = useState(false);

    const [loading, setLoading] = useState(false);

    async function excluir() {
        setDialog(false);
        setLoading(true);
        try {
            const response = await api.delete('/polimento-etas/' + item.id);
            setLoading(false);
            refresh();
            navigation.navigate('PolimentoEtaList');
        } catch (error) {
            setLoading(false);
            // setError('Não foi possível excluir este local.')
            const validation = handlingErros(error);
            setError(validation);
        }
    }

    useEffect(() => {
        async function getImages() {
            const imgs = item.files.map((file) => {
                return {
                    source: {
                        uri: `${baseURL}/files/${file.id}`,
                    },
                    title: file.id,
                    width: 806,
                    height: 720,
                };
            });
            setImages(imgs);
        }
        getImages();
    }, [item]);

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

            <Text style={styles.title_view}>Detalhes Polimento com Eta</Text>
            <Text>Eta: {item?.eta?.nome}</Text>
            <Text>Vazão: {item.vazao}</Text>
            <Text>PH: {item.ph}</Text>
            <Text>PAC: {item.pac}</Text>
            <Text>Polímero: {item.polimero}</Text>
            <Text>Hipoclorito: {item.hipoclorito}</Text>
            <Text>Observações: {item.observacao}</Text>

            <Text>Caixa de saída ETA</Text>
            <Text>pH: {item.ph_caixa_saida_eta}</Text>
            <Text>SS: {item.ss_caixa_saida_eta}</Text>
            <Text>Observação: {item.observacao_caixa_saida_eta}</Text>

            <Text>Caixa de saída Final</Text>
            <Text>pH: {item.ph_caixa_saida_final}</Text>
            <Text>SS: {item.ss_caixa_saida_final}</Text>
            <Text>Observação: {item.observacao_caixa_saida_final}</Text>

            {item?.files.length > 0 && (
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
                        navigation.navigate('PolimentoEtaEdit', {
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
