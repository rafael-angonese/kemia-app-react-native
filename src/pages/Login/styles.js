import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    button: {
        width: '90%',
    },
});

export default styles;
