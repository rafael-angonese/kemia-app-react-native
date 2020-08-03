import React, { useState } from 'react'
import { View, Button, StyleSheet, TextInput, Text, ActivityIndicator } from 'react-native'
import { useAuth } from '../../contexts/auth'
import * as Yup from 'yup'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        margin: 5,
        height: 40,
        padding: 10,
        borderColor: '#7a42f4',
        width: '90%',
        borderWidth: 1,
        fontSize: 16,
        borderRadius: 4,
    },
    error: {
        color: '#ce2029',
        //marginBottom: 10,
    },
    button: {
        width: '90%'
    }
})


const Login = () => {

    const { signIn } = useAuth()

    const [username, setUsername] = useState('rafael');
    const [senha, setSenha] = useState('123456');
    const [error, setError] = useState({})

    const [spinner, setSpinner] = useState(false);

    async function validation() {
        setError({})

        try {
            const schema = Yup.object().shape({
                username: Yup.string().required('O nome de usuário é obrigatório'),
                senha: Yup.string().required('A senha é obrigatório'),
            })

            await schema.validate({ username: username, senha: senha }, {
                abortEarly: false,
            })

            return true

        } catch (error) {

            if (error instanceof Yup.ValidationError) {
                const errorMessages = {}

                error.inner.forEach(erro => {
                    errorMessages[erro.path] = erro.message
                })
                setError(errorMessages)
            }

            return false
        }


    }

    async function handleLogin() {

        let validate = await validation()
        if (validate == false) {
            return
        }

        setSpinner(true)
        let isActive = true;

        signIn(username, senha).then((response) => {

            if (response.status == 401 || response.status == 400) {
                if (isActive) {
                    const errorMessages = {}

                    response.data.forEach(erro => {
                        errorMessages[erro.field] = erro.message
                    })

                    setError(errorMessages)
                }

                setSpinner(false)
            }

        }).catch((error) => {
            setSpinner(false)
            setError({ error: 'Aconteceu um erro ao comunicar com o servidor' })
        })

        return () => {
            isActive = false;
        };
    }

    return (
        <View style={styles.container}>

            <TextInput style={styles.input}
                placeholder="Nome do usuário"
                value={username}
                autoCorrect={false}
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                onChangeText={text => setUsername(text)}
            />
            <Text style={styles.error}>{error.username}</Text>

            <TextInput style={styles.input}
                placeholder="Senha"
                value={senha}
                autoCorrect={false}
                secureTextEntry={true}
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                onChangeText={text => setSenha(text)}
            />
            <Text style={styles.error}>{error.senha}</Text>

            <Text style={styles.error}>{error.error}</Text>
            <ActivityIndicator style={spinner == true ? { display: 'flex' } : { display: 'none' }} size="large" color="#9a73ef" />

            <View style={styles.button}>
                <Button title="Entrar" onPress={() => { handleLogin() }} />
            </View>

        </View>
    )
}

export default Login