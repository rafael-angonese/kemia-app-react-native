import React, { useState, useRef } from 'react';
import { View, Button, TextInput, Text, ActivityIndicator } from 'react-native';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { signInRequest } from '../../store/modules/auth/actions';

import styles from './styles';

const Login = () => {
    const { loading, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const senhadRef = useRef();
    const [username, setUsername] = useState('rafael');
    const [senha, setSenha] = useState('123456');
    const [yupError, setYupError] = useState({});

    async function validation() {
        setYupError({});

        try {
            const schema = Yup.object().shape({
                username: Yup.string()
                    .trim()
                    .required('O nome de usuário é obrigatório'),
                senha: Yup.string().trim().required('A senha é obrigatório'),
            });

            await schema.validate(
                { username, senha },
                {
                    abortEarly: false,
                }
            );

            return true;
        } catch (errors) {
            if (errors instanceof Yup.ValidationError) {
                const errorMessages = {};

                errors.inner.forEach((erro) => {
                    errorMessages[erro.path] = erro.message;
                });
                setYupError(errorMessages);
            }

            return false;
        }
    }

    async function handleSubmit() {
        const validate = await validation();
        if (validate === false) {
            return;
        }

        dispatch(signInRequest(username, senha));
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome do usuário"
                value={username}
                autoCorrect={false}
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => senhadRef.current.focus()}
                onChangeText={(text) => setUsername(text)}
            />
            <Text style={styles.error}>
                {yupError.username} {error.username}
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={senha}
                autoCorrect={false}
                // secureTextEntry={true}
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                ref={senhadRef}
                returnKeyType="send"
                onSubmitEditing={handleSubmit}
                onChangeText={(text) => setSenha(text)}
            />
            <Text style={styles.error}>
                {yupError.senha} {error.senha}
            </Text>

            <Text style={styles.error}>{yupError.error}</Text>

            <View style={styles.button}>
                {loading ? (
                    <ActivityIndicator color="#9a73ef" size="large" />
                ) : (
                    <Button title="Entrar" onPress={handleSubmit} />
                )}
            </View>
        </View>
    );
};

export default Login;
