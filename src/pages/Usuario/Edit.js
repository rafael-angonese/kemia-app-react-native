import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Keyboard,
} from 'react-native';
import { TextInput, Snackbar, Button, HelperText, RadioButton } from 'react-native-paper';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import { useAuth } from '../../contexts/auth';
import yupValidator from '../../utils/yupValidator';
import handlingErros from '../../utils/handlingErros';
import api from '../../services/api';

import styles from '../Styles/styles';

const Edit = ({ route }) => {
    const { item } = route.params;
    const { refresh } = route.params;
    const navigation = useNavigation();
    const { empresa } = useAuth();

    const [loading, setLoading] = useState(false);
    const [locais, setLocais] = useState([]);

    const nomeRef = useRef();
    const usernameoRef = useRef();

    const [nome, setNome] = useState(item.nome);
    const [username, setUsername] = useState(item.username);
    const [tipo, setTipo] = useState(item.tipo);

    const [locals, setLocals] = useState([]);
    const [snackbar, setSnackbar] = useState(false);
    const [error, setError] = useState({});

    const onSelectedItemsChange = (local) => {
        setLocais(local);
    };

    async function salvar() {
        const schema = Yup.object().shape({
            nome: Yup.string().required('Nome é obrigatório'),
            username: Yup.string().required('Login é obrigatório'),
            tipo: Yup.string().required('Tipo é obrigatório'),
        });

        const validation = await yupValidator(schema, {
            nome,
            username,
            tipo,
        });

        setError(validation);

        if (Object.keys(validation).length !== 0) return;

        setLoading(true);
        try {
            const response = await api.put(`/users/${item.id}`, {
                nome,
                username,
                tipo,
                empresa_id: empresa.id,
                locais,
            });
            setLoading(false);
            const { data } = response;

            setNome('');
            setUsername('');
            setTipo('');
            setLocais([]);
            setSnackbar(true);
            refresh();
            navigation.navigate('UsuarioList');
        } catch (error) {
            setLoading(false);
            const validation = handlingErros(error);
            setError(validation);
        }
    }

    async function myAsyncEffect() {
        setLoading(true);
        try {
            const response = await api.get(`/locais?empresaId=${empresa.id}`);
            const { data } = response;
            setLocals(data);

            const selected_locais = item.locais.map((item) => {
                return item.id;
            });
            setLocais(selected_locais);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            setLocals([]);
            const validation = handlingErros(error);
            setError(validation);
        }
    }

    useEffect(() => {
        myAsyncEffect();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <TextInput
                    label="Nome:"
                    value={nome}
                    ref={nomeRef}
                    onChangeText={(text) => setNome(text)}
                    onSubmitEditing={() => usernameoRef.current.focus()}
                />
                <HelperText type="error" visible={true}>
                    {error?.nome}
                </HelperText>

                <TextInput
                    label="Login:"
                    value={username}
                    ref={usernameoRef}
                    onChangeText={(text) => setUsername(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.username}
                </HelperText>
                <View style={styles.container_row}>
                    <Text>Master</Text>
                    <RadioButton
                        value="master"
                        status={tipo === 'master' ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setTipo('master');
                        }}
                    />
                    <Text style={{ marginLeft: 30 }}>Administrador</Text>
                    <RadioButton
                        value="admin"
                        status={tipo === 'admin' ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setTipo('admin');
                        }}
                    />

                    <Text style={{ marginLeft: 30 }}>Operador</Text>
                    <RadioButton
                        value="operator"
                        status={tipo === 'operator' ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setTipo('operator');
                        }}
                    />
                </View>

                <SectionedMultiSelect
                    items={locals}
                    uniqueKey="id"
                    subKey="children"
                    selectChildren
                    displayKey="nome"
                    selectText="Selecione locais"
                    showDropDowns={true}
                    readOnlyHeadings={false}
                    onSelectedItemsChange={onSelectedItemsChange}
                    selectedItems={locais}
                />

                <ActivityIndicator
                    style={
                        loading == true
                            ? { display: 'flex' }
                            : { display: 'none' }
                    }
                    size="large"
                    color="#0000ff"
                />
                {error.length !== 0 && (
                    <Text style={styles.error}>{error?.request}</Text>
                )}

                <Button
                    icon="content-save"
                    style={{ marginTop: 20 }}
                    mode="contained"
                    disabled={loading}
                    onPress={() => {
                        Keyboard.dismiss();
                        salvar();
                    }}
                >
                    Salvar
                </Button>
            </ScrollView>
            <Snackbar
                visible={snackbar}
                onDismiss={() => setSnackbar(false)}
                action={{
                    label: 'OK',
                    onPress: () => {},
                }}
            >
                Adicionado com sucesso!!!
            </Snackbar>
        </View>
    );
};

export default Edit;
