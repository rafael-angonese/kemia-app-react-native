import React, { useState, useRef } from 'react';
import { View, Button, TextInput, Text, ActivityIndicator } from 'react-native';
import * as Yup from 'yup';

import { useAuth } from '../../contexts/auth';
import yupValidator from '../../utils/yupValidator';
import api from '../../services/api';
import handlingErros from '../../utils/handlingErros';
import styles from './styles';

const Login = () => {
    const { setAuthToken, setAuthUser, setAuthEmpresa } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const senhadRef = useRef();
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');

    async function handleSubmit() {

        const schema = Yup.object().shape({
            username: Yup.string()
                .trim()
                .required('O nome de usuário é obrigatório'),
            senha: Yup.string().trim().required('A senha é obrigatório'),
        });

        const validation = await yupValidator(schema, {
            username, senha
        });

        setError(validation);

        if (Object.keys(validation).length !== 0) return;

        setLoading(true);
        try {

            const response = await api.post('/authenticate', {
                username,
                senha,
              });
              const { data } = response;
              const { token, refreshToken, user } = data;

              setAuthToken(token, refreshToken);
              api.defaults.headers.Authorization = `Bearer ${token}`;
              setAuthEmpresa(user.empresa)
              setAuthUser(user);

              setLoading(false);
        } catch (error) {
            setLoading(false);
            const validation = handlingErros(error);
            setError(validation);
        }
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
               {error.username}
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
                {error.senha}
            </Text>

            <Text style={styles.error}>{error.error}</Text>

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
