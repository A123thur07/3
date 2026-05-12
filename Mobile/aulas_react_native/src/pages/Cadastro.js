import {View, Text, Button} from 'react-native';

//recebemos como props os navegadores, para podermos navegar entre as telas, e o navigation é um deles
const Cadastro = ({navigation}) => {
    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: '#a5e1e9'}}>
            
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>TELA DE CADASTRO</Text>
            {/* Nos botões, o onPress busca a tela correspondente */}
            <Button title='Ir para tela de Relatório' onPress={() => navigation.navigate('Relatorio')}/>
            <Button title='Ir para tela de Grafico' onPress={() => navigation.navigate('Grafico')}/>
            <Button title='Voltar' onPress={() => navigation.goBack()}/>   
        </View> 
    )
}

export default Cadastro;