import {View, Text, Button} from 'react-native';

//recebemos como props os navegadores, para podermos navegar entre as telas, e o navigation é um deles
const Relatorio = ({navigation}) => {
    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: '#c4bdf3'}}>
            
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>TELA DE RELATÓRIO</Text>
            {/* Nos botões, o onPress busca a tela correspondente */}
            <Button title='Ir para tela de Cadastro' onPress={() => navigation.navigate('Cadastro')}/>
            <Button title='Ir para tela de Gráfico' onPress={() => navigation.navigate('Grafico')}/>
            <Button title='Voltar' onPress={() => navigation.goBack()}/>   
        </View> 
    )
}

export default Relatorio;