import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Keyboard,
} from 'react-native';
import {
    TextInput,
    Snackbar,
    Checkbox,
    Button,
    HelperText,
} from 'react-native-paper';
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
    const { empresa, local } = useAuth();

    const [loading, setLoading] = useState(false);

    const [tipo, setTipo] = useState(item.tipo);
    const [bruto_min, setbruto_min] = useState(item.bruto_min);
    const [bruto_max, setbruto_max] = useState(item.bruto_max);
    const [reator1_min, setReator1_min] = useState(item.reator1_min);
    const [reator1_max, setReator1_max] = useState(item.reator1_max);
    const [reator2_min, setReator2_min] = useState(item.reator2_min);
    const [reator2_max, setReator2_max] = useState(item.reator2_max);
    const [reator3_min, setReator3_min] = useState(item.reator3_min);
    const [reator3_max, setReator3_max] = useState(item.reator3_max);
    const [tratado_min, setRratado_min] = useState(item.tratado_min);
    const [tratado_max, setRratado_max] = useState(item.tratado_max);

    const [error, setError] = useState({});
    const [snackbar, setSnackbar] = useState(false);

    async function salvar() {
        const schema = Yup.object().shape({
            bruto_min: Yup.string()
                .min(1)
                .required('Bruto Mínimo é obrigatório'),
            bruto_max: Yup.string()
                .min(1)
                .required('Bruto Máximo é obrigatório'),
            reator1_min: Yup.string()
                .min(1)
                .required('Bruto 1 Mínimo é obrigatório'),
            reator1_max: Yup.string()
                .min(1)
                .required('Reator 1 Máximo é obrigatório'),
            reator2_min: Yup.string()
                .min(1)
                .required('Reator 2 Mínimo é obrigatório'),
            reator2_max: Yup.string()
                .min(1)
                .required('Reator 2 Máximo é obrigatório'),
            reator3_min: Yup.string()
                .min(1)
                .required('Reator 3 Mínimo é obrigatório'),
            reator3_max: Yup.string()
                .min(1)
                .required('Reator 3 Máximo é obrigatório'),
            tratado_min: Yup.string()
                .min(1)
                .required('Tratado Mínimo é obrigatório'),
            tratado_max: Yup.string()
                .min(1)
                .required('Tratado Máximo é obrigatório'),
        });

        const validation = await yupValidator(schema, {
            bruto_min,
            bruto_max,
            reator1_min,
            reator1_max,
            reator2_min,
            reator2_max,
            reator3_min,
            reator3_max,
            tratado_min,
            tratado_max,
        });

        setError(validation);

        if (Object.keys(validation).length !== 0) return;

        setLoading(true);
        try {
            const response = await api.put(`/configuracaos/${item.id}`, {
                // tipo,
                bruto_min,
                bruto_max,
                reator1_min,
                reator1_max,
                reator2_min,
                reator2_max,
                reator3_min,
                reator3_max,
                tratado_min,
                tratado_max,
                // empresa_id: empresa.id,
            });
            setLoading(false);
            const { data } = response;

            setSnackbar(true);
            refresh();
            navigation.navigate('ConfiguracaoList');
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
                    label="Bruto Mínimo:"
                    value={bruto_min}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setbruto_min(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.bruto_min}
                </HelperText>

                <TextInput
                    label="Bruto Máximo:"
                    value={bruto_max}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setbruto_max(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.bruto_max}
                </HelperText>

                <TextInput
                    label="Reator 1 Mínimo:"
                    value={reator1_min}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setReator1_min(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.reator1_min}
                </HelperText>

                <TextInput
                    label="Reator 1 Máximo:"
                    value={reator1_max}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setReator1_max(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.reator1_max}
                </HelperText>

                <TextInput
                    label="Reator 2 Mínimo:"
                    value={reator2_min}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setReator2_min(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.reator2_min}
                </HelperText>

                <TextInput
                    label="Reator 2 Máximo:"
                    value={reator2_max}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setReator2_max(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.reator2_max}
                </HelperText>

                <TextInput
                    label="Reator 3 Mínimo:"
                    value={reator3_min}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setReator3_min(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.reator3_min}
                </HelperText>

                <TextInput
                    label="Reator 3 Máximo:"
                    value={reator3_max}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setReator3_max(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.reator3_max}
                </HelperText>

                <TextInput
                    label="Tratado Mínimo:"
                    value={tratado_min}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setRratado_min(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.tratado_min}
                </HelperText>

                <TextInput
                    label="Tratado Máximo:"
                    value={tratado_max}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setRratado_max(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.tratado_max}
                </HelperText>

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
