import { View, Text, FlatList } from 'react-native'
import Hr from './Hr'

export const Aula03_Exercicio = () => {
    //Definindo um vetor de turmas como fonte de dados para lista
    const alunos = [
        { id: 1, aluno: 'João', materia: 'Matemática', média: 10, faltas: 0 },
        { id: 2, aluno: 'Maria', materia: 'Português', média: 8, faltas: 2 },
        { id: 3, aluno: 'Pedro', materia: 'História', média: 6, faltas: 5 },
        { id: 4, aluno: 'Ana', materia: 'Geografia', média: 2, faltas: 8 },
    ]
    const exibirItensListaAlunos = ({ item }) => (
        <View style={
            { flexDirection: 'row', 
            justifyContent: 'space-between', 
            padding: 10, }
        }>
            <Text> id: {item.id} </Text>
            <Text> Aluno: {item.aluno} </Text>
            <Text> Matéria: {item.materia} </Text>
            <Text> Média: {item.média} </Text>
            <Text> Faltas: {item.faltas} </Text>
        </View>
        
    )
    return (
        <View>
            <Hr />
            <Text> Aula 03 - Exercícios </Text>
            <Text> Criando lista do alunos em FlatList </Text>
            <Hr />
            <Text
                style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
                Interclasse SESI 2026 
            </Text>
            <FlatList
                data={alunos} //Passando o vetor de turmas para o Flet como prop
                renderItem={exibirItensListaAlunos} //Função que exibe os itens
                keyExtractor={(item) => item.id} //Função que gerencia as chaves únicas da lista
            />


        </View>
    )
}
