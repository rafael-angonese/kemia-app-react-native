import React, { Component, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Button, Chip, Paragraph, Dialog, Portal } from 'react-native-paper';
import { destroyInRequest } from '../../store/modules/local/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import styles from '../Styles/styles';

const Show = ({ route }) => {
    const { refresh } = route.params;
    const { item } = route.params;
    const [erro, setErro] = useState('');
    const [dialog, setDialog] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.local);

    async function excluir() {
        setDialog(false);
        dispatch(
            destroyInRequest(item.id, (success) => {
                if (!success) {
                    setErro('Não foi possível excluir este local')
                }
                if (success) {
                    refresh()
                    navigation.navigate('LocalList')
                }
            })
        );
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
            {erro.length !== 0 && <Text style={styles.error}>{erro}</Text>}

            <Text style={styles.title_view}>Detalhes do local</Text>
            <Text>Id: {item.id}</Text>
            <Text>Nome: {item.nome}</Text>
            <Text>Endereço: {item.endereco}</Text>
            <Text>Descrição: {item.descricao}</Text>
            <Text>Usuarios:</Text>
            <View style={styles.container_row}>
                {item.users.map((item, index) => (
                    <Chip key={item.id} icon="account">
                        {item.nome}
                    </Chip>
                ))}
            </View>
            <View style={styles.container_row}>
                <Button
                    style={styles.button_radius}
                    icon="pencil"
                    mode="contained"
                    onPress={() =>
                        navigation.navigate('LocalEdit', {
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
