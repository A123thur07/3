import {View, Text} from 'react-native';
import Hr from './Hr';

const Aula04 = () => {
    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: '#c4bdf3'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>AULA 04- Criação de Appp de lista de compras</Text>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Desenvolvendo nosso primeiro app do zero ao deploy</Text>
            <Hr />
        </View>
    )
}

export default Aula04;
