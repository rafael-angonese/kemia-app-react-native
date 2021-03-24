import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Keyboard,
} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { TextInput, Snackbar, Button, HelperText } from 'react-native-paper';
import * as Yup from 'yup';

import { useAuth } from '../../contexts/auth';
import yupValidator from '../../utils/yupValidator';
import handlingErros from '../../utils/handlingErros';
import api from '../../services/api';

import styles from '../Styles/styles';

const New = ({ route }) => {
    const { refresh } = route.params;
    const { empresa } = useAuth();

    const [loading, setLoading] = useState(false);
    const [usuarios, setUsuarios] = useState([]);

    const nomeRef = useRef();
    const descricaoRef = useRef();
    const enderecoRef = useRef();

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [endereco, setEndereco] = useState('');
    const [users, setUsers] = useState([]);
    const [snackbar, setSnackbar] = useState(false);
    const [error, setError] = useState({});

    const onSelectedItemsChange = (usuario) => {
        setUsers(usuario);
    };

    async function salvar() {
        const schema = Yup.object().shape({
            nome: Yup.string().required('Nome é obrigatório'),
            descricao: Yup.string().required('Descrição é obrigatório'),
            endereco: Yup.string().required('Endereço é obrigatório'),
        });

        const validation = await yupValidator(schema, {
            nome,
            descricao,
            endereco,
        });

        setError(validation);

        if (Object.keys(validation).length !== 0) return;

        setLoading(true);
        try {
            const response = await api.post('/locais', {
                nome,
                descricao,
                endereco,
                empresa_id: empresa.id,
                users,
            });
            setLoading(false);
            const { data } = response;

            setNome('');
            setDescricao('');
            setEndereco('');
            setUsers([]);
            setSnackbar(true);
            refresh();

        } catch (error) {
            setLoading(false);
            const validation = handlingErros(error);
            setError(validation);
        }

    }

    async function myAsyncEffect() {
        setLoading(true);
        try {
            const response = await api.get(`users?empresaId=${empresa.id}`)
            const { data } = response;
            setUsuarios(data)
            setLoading(false);

        } catch (error) {
            setLoading(false);
            setUsuarios([])
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
                    onSubmitEditing={() => descricaoRef.current.focus()}
                />
                <HelperText type="error" visible={true}>
                    {error?.nome}
                </HelperText>

                <TextInput
                    label="Descrição:"
                    value={descricao}
                    ref={descricaoRef}
                    onSubmitEditing={() => enderecoRef.current.focus()}
                    onChangeText={(text) => setDescricao(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.descricao}
                </HelperText>
                <TextInput
                    label="Endereço:"
                    value={endereco}
                    ref={enderecoRef}
                    onChangeText={(text) => setEndereco(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.endereco}
                </HelperText>
                <SectionedMultiSelect
                    items={usuarios}
                    uniqueKey="id"
                    subKey="children"
                    selectChildren
                    displayKey="nome"
                    selectText="Selecione usuários"
                    showDropDowns={true}
                    readOnlyHeadings={false}
                    onSelectedItemsChange={onSelectedItemsChange}
                    selectedItems={users}
                />

                <ActivityIndicator
                    style={
                        loading === true
                            ? { display: 'flex' }
                            : { display: 'none' }
                    }
                    size="large"
                    color="#0000ff"
                />
                {error.length !== 0 && (
                    <Text style={styles.error}>{error?.error}</Text>
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

export default New;
