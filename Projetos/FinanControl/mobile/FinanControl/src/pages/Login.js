import { Text, View, Button, TextInput, TouchableOpacity, Image, Switch } from 'react-native';
import { useState, useEffect } from 'react';
import { enderecoServidor } from '../utils.js';
import AsyncStorage from '@react-native-async-storage/async-storage'
import logo from '../assets/logo.png'

import { LinearGradient } from 'expo-linear-gradient'
import { EstilosLogin, coresLogin } from '../style/EstilosLogin.js';
import { MaterialIcons } from '@expo/vector-icons'
import { corFundo2, corPrincipal } from '../style/Estilos.js'

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState('');

    const [lembrar, setLembrar] = useState(false)
    const [mostrarSenha, setMostrarSenha] = useState(false)

    async function botaoLogin() {

        try {
            if (email == '' || senha == '') {
                setMensagem('Preencha todos os campos');
                return //Sai da função e não executa o resto do código
            }

            const dadosLogin = {
                "email": email,
                "senha": senha
            }

            const resposta = await fetch(`${enderecoServidor}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosLogin)
            })
            if (resposta.status == 404) {
                setMensagem(`Rota não encontrada: ${resposta.url}`);
                return
            }
            const dados = await resposta.json()
            if (resposta.status == 500) {
                setMensagem(`Erro no servidor: ${dados.message}`);
                return
            }
            if (resposta.ok) {
                AsyncStorage.setItem('UsuarioLogado', JSON.stringify({ ...dados, lembrar }));
                // localStorage.setItem('token', JSON.stringify(...dados, token))
                navigation.navigate('MenuDrawer');
            } else {
                setMensagem(`❌ Email ou senha incorretos!`);
            }

        } catch (erro) {
            setMensagem(`Erro ao realizar login: ${erro.message}`)
        }
    }

    useEffect(() => {
        async function buscarUsuario() {
            const usuarioLogado = await AsyncStorage.getItem('UsuarioLogado')
            if (usuarioLogado != null) {
                const usuario = JSON.parse(usuarioLogado)
                if (usuario.lembrar == true) {
                    navigation.navigate('MenuDrawer')
                }
            }
        }

        buscarUsuario()
    }, [])

    return (
        <View style={EstilosLogin.container}>
            <LinearGradient
                colors={[corFundo2, corPrincipal]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={EstilosLogin.gradiente}
            >

                <View style={EstilosLogin.cabecalho}>
                    <Image style={EstilosLogin.iconeLogo} source={require('../assets/logo.png')} alt="" />
                    <View>
                        <Text style={EstilosLogin.nomeApp}>FinanControl</Text>

                    </View>
                </View>
                <View style={EstilosLogin.conteudoPrincipal}>
                    <View action="" style={EstilosLogin.formularioLogin}>
                        <Text style={EstilosLogin.titulo}> Acesse sua conta</Text>
                        <View style={EstilosLogin.grupoInput}>
                            <MaterialIcons name='email' style={EstilosLogin.iconeInput} />
                            <TextInput type='email' style={EstilosLogin.input}
                                placeholder='Digite seu email'
                                placeholderTextColor={coresLogin.placeholder}
                                value={email}
                                keyboardType='email-address'
                                autoCapitalize='none'
                                onChangeText={setEmail}
                            />
                        </View>
                        <View style={EstilosLogin.grupoInput}>
                            <MaterialIcons name='lock' style={EstilosLogin.iconeInput} />
                            <TextInput
                                style={EstilosLogin.input}
                                placeholder='Digite sua senha'
                                placeholderTextColor={coresLogin.placeholder}
                                value={senha}
                                onChangeText={setSenha}
                                secureTextEntry={!mostrarSenha}
                            />
                            <TouchableOpacity style={EstilosLogin.alternarVisibilidade}
                                type='button' onPress={() => setMostrarSenha(!mostrarSenha)} >
                                <MaterialIcons size={24} color={coresLogin.icone}
                                    name={mostrarSenha == true ? 'visibility' : 'visibility-off'}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={EstilosLogin.entreOpcoes}>
                            <View style={EstilosLogin.containerCheckbox}>
                                <Switch
                                    value={lembrar}
                                    onValueChange={setLembrar}
                                />
                                <Text style={EstilosLogin.rotuloCheckbox}>Lembrar-me</Text>
                            </View>
                            <Text style={EstilosLogin.esqueceuSenha}>Esqueci a Senha</Text>
                        </View>
                        <TouchableOpacity onPress={botaoLogin} style={EstilosLogin.botaoEntrar}>
                            <Text style={EstilosLogin.textoBotaoEntrar}>Entrar</Text>
                        </TouchableOpacity>
                        <Text style={EstilosLogin.mensagemFeedback}>{mensagem}</Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}