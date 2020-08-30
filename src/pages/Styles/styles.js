import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container_row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container_button: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    fab: {
        backgroundColor: '#2962ff',
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
    },
    error: {
        color: '#ce2029',
        textAlign: 'center',

        fontSize: 15,
    },
    empty: {
        textAlign: 'center',

        fontSize: 20,
    },
    container_data: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 30,
    },
    title_view: {
        fontSize: 30,
        color: '#000',
    },
    button_radius: {
        margin: 10,
        borderRadius: 70,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    innerContainer: {
        alignItems: 'center',
    },
    inputEmail: {
        margin: 5,
        height: 40,
        padding: 10,
        borderColor: '#7a42f4',
        width: '90%',
        borderWidth: 1,
        fontSize: 16,
        borderRadius: 4,
    },
});

export default styles;
