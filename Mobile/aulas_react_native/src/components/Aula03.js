import { View, Text, FlatList } from 'react-native'
import Hr from './Hr'
import { Aula03_Exercicio } from './Aula03_Exercicio'
import { Aula03_Exercicio2 } from './Aula03_Exercicio 2'

const Aula03 = () => {
    //Definindo um vetor de turmas como fonte de dados para lista
    const turmas = [
        { id: 1, turma: '3º A', pg: 10 },
        { id: 2, turma: '3º B', pg: 8 },
        { id: 3, turma: '2º A', pg: 6 },
        { id: 4, turma: '2º B', pg: 2 },
    ]

    // function exibirItensLista =( {item} ) => (
    const exibirItensLista = ({ item }) => (
        <Text> {item.turma} </Text>
    )
    const exibirItensListaInterclasse = ({ item }) => (
        <View style={
            { flexDirection: 'row', 
            justifyContent: 'space-between', 
            padding: 10, }
        }>
            <Text> {item.id}º </Text>
            <Text> Turma: {item.turma} </Text>
            <Text> Pontos: {item.pg} </Text>
        </View>
        
    )
    return (
        <View>
            <Hr />
            <Text> Aula 03 - Listas com Flat List </Text>
            <Text> Aprendendo a manipular listas em React Native</Text>
            <Hr />
            <Text> Lista de Turmas</Text>
            {
                turmas.map((item) => (
                    <Text key={item.id}> {item.turma} </Text>
                ))
            }
            <Text> Lista com o FlatList </Text>
            {/* Componente com FlatLista para exibir dados. Este componente é mais otimizado e eficiente para exibição de listas */}
            <FlatList
                data={turmas} //Passando o vetor de turmas para o Flet como prop
                renderItem={exibirItensLista} //Função que exibe os itens
                keyExtractor={(item) => item.id} //Função que gerencia as chaves únicas da lista
            />
            {/* Classificação do interclasse do SESIutilizando FlatList */}
            <Text
                style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
                Interclasse SESI 2026 
            </Text>
            <FlatList
                data={turmas} //Passando o vetor de turmas para o Flet como prop
                renderItem={exibirItensListaInterclasse} //Função que exibe os itens
                keyExtractor={(item) => item.id} //Função que gerencia as chaves únicas da lista
            />

            <Aula03_Exercicio/>
            <Aula03_Exercicio2/>
        </View>
    )
}

export default Aula03