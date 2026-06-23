import {View, Text, Button} from 'react-native';

//recebemos como props os navegadores, para podermos navegar entre as telas, e o navigation é um deles
const Login = ({navigation}) => {
    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: '#a5e1e9'}}>
            
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Tela de Login</Text>
            {/* Nos botões, o onPress busca a tela correspondente */}
            <Button title='ENTRAR' onPress={() => navigation.navigate('MenuPrincipal')}/> 
        </View> 
    )
}

export default Login;