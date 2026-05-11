import { View, Text, FlatList, Image } from 'react-native'
import Hr from './Hr'

export const Aula03_Exercicio2 = () => {

    // Vetor de produtos
    const produtos = [
        {
            id: 1,
            nome: 'NC500x',
            foto: 'https://i.pinimg.com/736x/3a/d8/c1/3ad8c1478d1ba9a50425c89bf7dfd6e3.jpg',
            categoria: 'dmanobra',
            preco: 30.000,
            estoque: 10
        },
        {
            id: 2,
            nome: 'Filhote de cleiton rasta',
            foto: 'https://pbs.twimg.com/media/FRTesITXEAABBWa.jpg',
            categoria: 'pardal',
            preco: 9.00,
            estoque: 50
        },
        {
            id: 3,
            nome: 'NAVE do chef',
            foto: 'https://i.pinimg.com/1200x/43/27/3a/43273a678a0b6a1c82028ff6454c7db9.jpg',
            categoria: 'Locomotivo',
            preco: 9.000,
            estoque: 25
        },
        {
            id: 4,
            nome: 'OITÃO',
            foto: 'https://i.redd.it/6u9uo8ek1gry.jpg',
            categoria: 'Brinquedo',
            preco: 8.00,
            estoque: 10
        },
    ]

    
    const exibirItensListaProdutos = ({ item }) => (
        <View style={{
            flex: 1,
            padding: 10,
            alignItems: 'center'
        }}>

            <View style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 10,
                alignItems: 'center',
                elevation: 5,
                width: 220
            }}>

                {/* IMAGEM 50% MAIOR */}
                <Image
                    source={{ uri: item.foto }}
                    style={{
                        width: 150,
                        height: 150,
                        borderRadius: 10,
                        resizeMode: 'cover'
                    }}
                />

                <View style={{
                    marginTop: 10,
                    width: '100%'
                }}>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 5
                    }}>

                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            flex: 1
                        }}>
                            {item.nome}
                        </Text>

                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold'
                        }}>
                            R$ {item.preco.toFixed(2)}
                        </Text>

                    </View>

                    <Text style={{
                        fontSize: 14,
                        color: '#666'
                    }}>
                        {item.categoria} - Estoque: {item.estoque}
                    </Text>

                </View>

            </View>

        </View>
    )

    return (
        <View>

            <Hr />

            <Text>Aula 03 - Exercício 02</Text>
            <Text>Criando lista de produtos em FlatList</Text>

            <Hr />

            <Text style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                marginVertical: 10
            }}>
                Produtos
            </Text>

            <FlatList
                data={produtos}
                renderItem={exibirItensListaProdutos}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
            />

        </View>
    )
}