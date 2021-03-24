import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Keyboard,
} from 'react-native';
import { TextInput, Snackbar, Button, HelperText } from 'react-native-paper';
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
    const [usuarios, setUsuarios] = useState([]);

    const nomeRef = useRef();
    const descricaoRef = useRef();
    const enderecoRef = useRef();

    const [nome, setNome] = useState(item.nome);
    const [descricao, setDescricao] = useState(item.descricao);
    const [endereco, setEndereco] = useState(item.endereco);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState({});
    const [snackbar, setSnackbar] = useState(false);

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
            const response = await api.put(`/locais/${item.id}`, {
                nome,
                descricao,
                endereco,
                users,
                empresa_id: empresa.id,
            });
            setLoading(false);
            const { data } = response;

            setNome('');
            setDescricao('');
            setEndereco('');
            setUsers([]);
            setSnackbar(true);
            refresh();
            navigation.navigate('LocalList');
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
            setLoading(false);
            const { data } = response;
            setUsuarios(data);

            const selected_users = item.users.map((item) => {
                return item.id;
            });
            setUsers(selected_users);
        } catch (error) {
            setLoading(false);
            setUsuarios([]);
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
                    selectChildren="false"
                    displayKey="nome"
                    selectText="Selecione usuários"
                    showDropDowns={true}
                    readOnlyHeadings={false}
                    onSelectedItemsChange={onSelectedItemsChange}
                    selectedItems={users}
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
