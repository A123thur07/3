import { Text, View, Button, TouchableOpacity } from 'react-native';
import { useState, useEffect } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Principal({ navigation }) {
    const [dadosLogin, setDadosLogin] = useState(null)

    useEffect(() => {
        async function buscarUsuario() {
            const usuarioLogado = await AsyncStorage.getItem('UsuarioLogado')
            if (usuarioLogado) {
                setDadosLogin(JSON.parse(usuarioLogado))
            }
        }

        buscarUsuario()
    }, [])

    function botaoLogout() {
        AsyncStorage.removeItem('UsuarioLogado')
        navigation.navigate('Login')
    }
    return (
        <View>
            <View style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ccc' }}>
                <Text>Usuário: {dadosLogin?.usuario?.nome}( {dadosLogin?.usuario?.email} )</Text>
                <TouchableOpacity
                    onPress={botaoLogout}
                    style={{
                        backgroundColor: '#FF4D4D',
                        padding: 16,
                        borderRadius: 8
                    }}
                >
                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>
                        Sair
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}