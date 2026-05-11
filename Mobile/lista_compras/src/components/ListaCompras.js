import { useState, useEffect } from 'react'
import { Text, View, TextInput, TouchableOpacity, FlatList, Image, StatusBar } from 'react-native'
import Estilos, { corPrincipal, corSecundaria, corTextos, corFundo, corFundo2, corPlaceholder } from '../styles/Estilos'
import { MaterialIcons } from '@expo/vector-icons'
import { firestore } from './firebase.config'
import {
    collection, addDoc, getDocs, query, doc, updateDoc, deleteDoc,
    where, orderBy
} from 'firebase/firestore'

const ListaCompras = () => {
    // Variável de estado para o item que irei incluir na lista
    const [item, setItem] = useState('')
    const [listaCompras, setListaCompras] = useState([])

    async function buscarDados() {
        //Representa um SELECT * FROM COMPRAS
        const comando = query(collection(firestore, 'lista_compras_arthur'))
        const dadosBD = await getDocs(comando)

        const novaLista = dadosBD.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))

        setListaCompras(novaLista)
    }

    useEffect(() => {
        buscarDados()
    }, [])

    async function botaoExcluir(id) {
        await deleteDoc(doc(firestore, 'lista_compras_arthur', id))
        buscarDados()
    }

    async function botaoAtualizar(item) {
        const docRef = doc(firestore, 'lista_compras_arthur', item.id)
        await updateDoc(docRef, {
            comprado: !item.comprado
        })
        buscarDados()
    }

    //Função para desenhar os itens na lista
    const exibirItens = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => botaoAtualizar(item)} style={Estilos.botaoItem} >

                <Text style={item.comprado ? Estilos.textoBotaoItemComprado : Estilos.textoBotaoItem}>
                    {item.produto}
                </Text>
                <MaterialIcons name='delete-outline' size={24} color={corPrincipal} onPress={() => botaoExcluir(item.id)} />
            </TouchableOpacity>
        )
    }

    const adicionarItem = async () => {

        const novoItem = {
            produto: item,
            comprado: false
        };
        const docRef = await addDoc(collection(firestore, 'lista_compras_arthur'), novoItem);
        console.log('Documento adicionado com ID: ', docRef.id);
        setItem('');
        await buscarDados();
    };




    return (
        <View style={Estilos.conteudo}>
            <StatusBar backgroundColor={corFundo} barStyle="light-content" />

            <View style={Estilos.header}>
                <Image
                    source={require('../assets/logo_lista_compras.png')}
                    style={Estilos.logo}
                />
                <Text>Lista de Compras</Text>
            </View>

            <View style={Estilos.corpo}>
                <View style={Estilos.inputContainer}>
                    <TextInput
                        placeholder="Digite o item a ser adicionado"
                        value={item}
                        onChangeText={setItem}
                        style={Estilos.input}
                        placeholderTextColor={corPlaceholder}
                    />
                    <TouchableOpacity style={Estilos.botao} onPress={adicionarItem}>
                        <Text style={Estilos.textoBotao}>+</Text>
                    </TouchableOpacity>
                </View>
                {/* Lista dos produtos */}
                <FlatList
                    //no atributo data enviamos o vetor de dados da lista 
                    data={listaCompras}
                    //no atributo renderItem enviamos a função que desenha o item da lista
                    renderItem={exibirItens}
                    // no atributo keyExtractor precisamos enviar um id único
                    keyExtractor={(item) => item.id}

                />
            </View>
        </View>
    );
};

export default ListaCompras;