import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
//Importando telas
import Home from "./Home";
import Cadastro from "./Cadastro";
import Relatorio from "./Relatorio";
import Grafico from "./Grafico";

//criando uma constante que cria o estilo de navegação Stack
const Stack = createNativeStackNavigator();

const NavStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                {/* Aqui definimos as telas, e o nome que queremos dar a elas */}
                {/* Em name definimos como ela vai ser chamada */}
                {/* Em component definimos qual tela vai ser renderizada */}
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Cadastro" component={Cadastro} />
                <Stack.Screen name="Relatorio" component={Relatorio}
                    options={{
                        title: 'Tela de Relatório',
                        headerStyle: { backgroundColor: '#c4bdf3' },
                        headerTintColor: '#fff',
                        headerTitleAlign: 'center',
                        headerTitleStyle: { fontWeight: 'bold' }
                    }} />
                <Stack.Screen name="Grafico" component={Grafico}
                    options={{
                        title: 'Tela de Gráfico',
                        headerStyle: { backgroundColor: '#f3eabd' },
                        headerTintColor: '#000000',
                        headerTitleAlign: 'center',
                        headerTitleStyle: { fontWeight: 'bold' }
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default NavStack;