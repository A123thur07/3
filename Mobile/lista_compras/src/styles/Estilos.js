import {StyleSheet} from 'react-native';

export const corPrincipal = '#59b6ff';
export const corSecundaria = '#02c380';
export const corTexto = '#FFF';
export const corFundo = '#000';
export const corFundo2 = '#262626';
export const corPlaceholder = '#808080';


const Estilos = StyleSheet.create({
    conteudo: {
        flex: 1,
        backgroundColor: corFundo,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    logo: {
        width: 300,
        height: 40,
        resizeMode: 'contain',
    },
    corpo: {
        flex: 1,
        paddingHorizontal: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: corFundo2,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: corPrincipal,
        marginRight: 5,
        paddingHorizontal: 10,
        color: corTexto,
        fontSize: 16,
        padding: 10,
    },
    botao: {
        width: 50,
        borderRadius: 5,
        backgroundColor: corSecundaria,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoBotao: {
        color: corTexto,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    botaoItem: {
        backgroundColor: corFundo2,
        marginBottom: 10,
        borderRadius: 5,
        padding: 15,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: corPlaceholder,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textoBotaoItem: {
        color: corTexto,
        fontSize: 18,
        flex: 1,
    },
    textoBotaoItemComprado: {
        color: corPlaceholder,
        fontSize: 18,
        textDecoritionLine: 'line-through',
        flex: 1,
    },
});

export default Estilos;