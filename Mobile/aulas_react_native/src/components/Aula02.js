import { useState } from 'react'
import { View, Text, Image, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native'
import Logo from '../../assets/icon.png'
import Hr from './Hr'
const Aula02 = () => {
    const [nome, setNome] = useState('')
    return (
        <View>
            <Hr />
            <Text>Aula 02 - Componentes Básicos</Text>
            <Text>Conhecendo os principais componentes do React Native</Text>

            {/* Inserindo imagem da internet */}
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png' }}
                style={{ width: 300, height: 200 }}
            />

            {/* Inserindo uma imagem direamente do caminho do arquivo */}
            <Image source={require('../../assets/icon.png')}
                style={{ width: 50, height: 50 }}
            />

            {/* Inserindo imagem referenciando como componente */}
            <Image source={Logo}
                style={{ width: 50, height: 50 }}
            />

            <TextInput
                placeholder='Digite seu nome'
                style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
                onChangeText={setNome}
                keyboardType='email-address'
            />

            <Text>Seu nome é: {nome}</Text>


            {/* Botão com poucas possiblidades de estilização */}
            <Button title='Clique aqui' onPress={() => console.log(nome)} />

            {/* Botão com controle total de estilização */}
            <TouchableOpacity
                onPress={() => console.log((nome))}
                style={estilos.botao}>

                <Image source={Logo} style={estilos.imagem} />
                <Text style={estilos.texto}>Botão TouchableOpacity</Text>
            </TouchableOpacity>
        </View>
    )
}

//Utilizando o Styleheet do react Native para que ele converta a estilização
//para o padrão dos componentes nativos
const estilos = StyleSheet.create({
    botao: { 
        padding: 12, 
        borderRadius: 8, 
        alignItems: 'center', 
        backgroundColor: "#fb00d1" },
    texto: { 
        color: '#fff', 
        fontSize: 16, 
        fontWeight: 'bold' },
    imagem: { 
        width: 50, 
        height: 50 }
})

export default Aula02