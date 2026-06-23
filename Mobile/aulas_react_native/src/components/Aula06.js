import {View, Text} from 'react-native';
import Hr from './Hr';

const Aula06 = () => {
    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: '#c4bdf3'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>AULA 06- Estilos de Navegação</Text>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Criando navegação do tipo Drawer no app</Text>
            <Hr />
        </View>
    )
}

export default Aula06;