import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
//Importando telas
import Home from "./Home";
import Cadastro from "./Cadastro";
import Relatorio from "./Relatorio";
import Grafico from "./Grafico";
import Login from "./Login"
import NavD from "./NavDrawer";

//criando uma constante que cria o estilo de navegação Stack
const TopTab = createMaterialTopTabNavigator();

const NavTopTabs = () => {
    return (
        <NavigationContainer>
            <TopTab.Navigator initialRouteName="Login">
                {/* Aqui definimos as telas, e o nome que queremos dar a elas */}
                {/* Em name definimos como ela vai ser chamada */}
                {/* Em component definimos qual tela vai ser renderizada */}

                <TopTab.Screen name="Home" component={Home} />
                <TopTab.Screen name="Login" component={Login} />
                <TopTab.Screen name="MenuPrincipal" component={NavD} 
                    options={{
                        headerShown: false
                    }}
                />
                <TopTab.Screen name="Cadastro" component={Cadastro} />
                <TopTab.Screen name="Relatorio" component={Relatorio}
                    options={{
                        title: 'Tela de Relatório',
                        headerStyle: { backgroundColor: '#c4bdf3' },
                        headerTintColor: '#fff',
                        headerTitleAlign: 'center',
                        headerTitleStyle: { fontWeight: 'bold' }
                    }} />
                <TopTab.Screen name="Grafico" component={Grafico}
                    options={{
                        title: 'Tela de Gráfico',
                        headerStyle: { backgroundColor: '#f3eabd' },
                        headerTintColor: '#000000',
                        headerTitleAlign: 'center',
                        headerTitleStyle: { fontWeight: 'bold' }
                    }}
                />

            </TopTab.Navigator>
        </NavigationContainer>
    );
};

export default NavTopTabs;