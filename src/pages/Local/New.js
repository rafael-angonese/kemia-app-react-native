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
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { dataInRequest } from '../../store/modules/usuario/actions';
import { storeInRequest } from '../../store/modules/local/actions';
import yupValidator from '../../utils/yupValidator';

import styles from '../Styles/styles';

const New = ({ route }) => {
    const { refresh } = route.params;

    const { loading } = useSelector((state) => state.local);
    const { usuarios } = useSelector((state) => state.usuario);
    const { empresa } = useSelector((state) => state.empresa);
    const dispatch = useDispatch();

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

        dispatch(
            storeInRequest(
                {
                    nome,
                    descricao,
                    endereco,
                    users,
                    empresa_id: empresa.id,
                },
                (success) => {
                    if (!success) {
                        setError({ request: 'Não foi possível persistir esses dados' })
                    }
                    if (success) {
                        setNome('');
                        setDescricao('');
                        setEndereco('');
                        setUsers([]);
                        setSnackbar(true)
                        refresh()
                    }
                }
            )
        );
    }

    async function myAsyncEffect() {
        dispatch(dataInRequest({ empresaId: empresa.id }));
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
                        loading === true
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

export default New;
