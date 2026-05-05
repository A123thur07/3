import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    StatusBar
} from 'react-native';
import Estilos, {
    corPrincipal,
    corSecundaria,
    corTexto,
    corFundo,
    corFundo2,
    corPlaceholder
} from '../styles/Estilos';
import { MaterialIcons } from '@expo/vector-icons';

const ListaCompras = () => {
    //variável de estado para armazenar o item a ser adicionado à lista de compras
    const [item, setItem] = React.useState('');
    const [listaCompras, setListaCompras] = React.useState([
        { id: 1, produto: 'Arroz 🍚', comprado: false },
        { id: 2, produto: 'Feijão 🫘', comprado: true },
        { id: 3, produto: 'Macarrão 🍝', comprado: false },
    ]);
    //função para desenhar os itens na lista
    const exibirItens = ({ item }) => (
        <TouchableOpacity style={Estilos.botaoItem} onPress={() => {
            const novaLista = listaCompras.map((produto) => {
                if (produto.id === item.id) {
                    return { ...produto, comprado: !produto.comprado };
                }
                return produto;
            });
            setListaCompras(novaLista);
        }}>
            <Text style={item.comprado ? Estilos.textoBotaoItemComprado : Estilos.textoBotaoItem}>
                {item.produto}
            </Text>
            <MaterialIcons
                onPress={() => {
                    const novaLista = listaCompras.filter((produto) => produto.id !== item.id);
                    setListaCompras(novaLista);
                }}
                name='delete-outline'
                size={24}
                color={corPrincipal}
            />
        </TouchableOpacity>
    );

    //função para adicionar um item à lista de compras
    const adicionarItem = () => {
        if (item.trim() === '') {
            return;
        }
        const novoItem = {
            id: Date.now(),
            produto: item,
            comprado: false
        };
        setListaCompras([...listaCompras, novoItem]);
        setItem('');
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
                <View style={Estilos.InputContainer}>
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