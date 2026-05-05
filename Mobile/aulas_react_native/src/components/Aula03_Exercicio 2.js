import { View, Text, FlatList, Image } from 'react-native'
import Hr from './Hr'

export const Aula03_Exercicio2 = () => {
    //Definindo um vetor de turmas como fonte de dados para lista
    const produtos = [
        { id: 1, nome: 'Protetor solar', foto: 'https://m.media-amazon.com/images/I/613ze9ScETL._AC_SX522_.jpg', categoria: 'Cosméticos', preco: 30.00, estoque: 100 },
        { id: 2, nome: 'Refrigerante de morango', foto: 'https://i.pinimg.com/webp/1200x/de/8c/f8/de8cf8a8083c35303df7b979f0085d23.webp', categoria: 'Bebidas', preco: 9.00, estoque: 50 },
        { id: 3, nome: 'Suco do Limão', foto: 'https://i.pinimg.com/webp/1200x/e1/81/8d/e1818d5814abe904e4c265fdde2ba27c.webp', categoria: 'Bebidas', preco: 9.00, estoque: 25 },
        { id: 4, nome: 'Pepino', foto: 'https://i.pinimg.com/736x/e3/78/52/e37852d7780cc2aa25b4755b58abbea1.jpg', categoria: 'Hortifruti', preco: 8.00, estoque: 10 },
    ]
    const exibirItensListaProdutos = ({ item }) => (
        <View style={{
            columnCount: 4,
            columnGap: 16,
            padding: 20
        }}>
            <View style={
                {
                    backgroundColor: '#fff',
                    marginBottom: 16,
                    borderRadius: 12,
                    overflow: 'hidden',
                    breakInside: 'avoid',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    transition: '0.3s'
                }
            }>
                <Image source={{ uri: item.foto }} style={{ width: 100, height: 100 }} />
                <div style={{ padding: 12 }}>
                    <div style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 10
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginBottom: 6,
                        }}>{item.nome} </Text>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginBottom: 6,
                        }}>{item.preco.toFixed(2)}</Text>
                    </div>
                    <div style={{ fontSize: 14, color: '#666' }}>{item.categoria} - Estoque: {item.estoque}</div>
                </div>
            </View >
        </View>

    )
    return (
        <View>
            <Hr />
            <Text> Aula 03 - Exercício 02 </Text>
            <Text> Criando lista de produtos em FlatList </Text>
            <Hr />
            <Text
                style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
                Produtos
            </Text>
            <View style={{
                columnCount: 4,
                columnGap: 16,
                padding: 20
            }}>
                <FlatList
                    data={produtos} //Passando o vetor de turmas para o Flet como prop
                    renderItem={exibirItensListaProdutos} //Função que exibe os itens
                    numColumns={2}
                    keyExtractor={(item) => item.id} //Função que gerencia as chaves únicas da lista
                />
            </View>


        </View>
    )
}
