import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const Home = () => {
    const navigation = useNavigation();
    const { user } = useSelector((state) => state.user);

    return (
        <View style={styles.container}>
            <Text>skadfjnasfikdshasjfddafasfdafasdfasf</Text>
            <Text>{user.nome}</Text>
            <Text>{user.tipo}</Text>
            <Text>{user.empresa_id}</Text>
            <Button
                title="Entrar"
                onPress={() => navigation.navigate('SelectEmpresa')}
            />
        </View>
    );
};

export default Home;
