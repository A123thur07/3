import {View, Text, Button} from 'react-native';

//recebemos como props os navegadores, para podermos navegar entre as telas, e o navigation é um deles
const Grafico = ({navigation}) => {
    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: '#f3eabd'}}>
            
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>TELA DE GRÁFICO</Text>
            {/* Nos botões, o onPress busca a tela correspondente */}
            <Button title='Ir para tela de Cadastro' onPress={() => navigation.navigate('Cadastro')}/>
            <Button title='Ir para tela de Relatório' onPress={() => navigation.navigate('Relatorio')}/>
            <Button title='Voltar' onPress={() => navigation.goBack()}/>   
        </View> 
    )
}

export default Grafico;