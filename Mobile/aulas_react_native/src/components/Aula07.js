import { View, Text } from 'react-native';
import Hr from './Hr';
import * as Animar from 'react-native-animatable';

const Aula07 = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#c4bdf3' }}>
            <Hr />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>AULA 07- Estilos de Navegação Tabs e Animações</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Criando navegação por abas e aprendendo sobre animações</Text>
            <Animar.Text animation='fadeInLeft'> Texto Animado </Animar.Text>
            <Animar.Text animation='fadeInUp' delay={1000}> Texto Animado com delay </Animar.Text>
            <Animar.Image animation='LightSpeedIn' iterationCount='infinite' style={{ width: 100, height: 100 }} source={require('../assets/images/image.png')} />
        </View>
    )
}

export default Aula07;