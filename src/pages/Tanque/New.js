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
    const { empresa, local } = useAuth();

    const [loading, setLoading] = useState(false);

    const nomeRef = useRef();
    const descricaoRef = useRef();

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [snackbar, setSnackbar] = useState(false);
    const [error, setError] = useState({});

    async function salvar() {
        const schema = Yup.object().shape({
            nome: Yup.string().required('Nome é obrigatório'),
            descricao: Yup.string().required('Descrição é obrigatório'),
        });

        const validation = await yupValidator(schema, {
            nome,
            descricao,
        });

        setError(validation);

        if (Object.keys(validation).length !== 0) return;

        setLoading(true);
        try {
            const response = await api.post('/tanques', {
                nome,
                descricao,
                empresa_id: empresa.id,
                local_id: local.id,
            });
            setLoading(false);
            const { data } = response;

            setNome('');
            setDescricao('');
            setSnackbar(true);
            refresh();
        } catch (error) {
            setLoading(false);
            const validation = handlingErros(error);
            setError(validation);
        }
    }

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
                    onChangeText={(text) => setDescricao(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.descricao}
                </HelperText>

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
