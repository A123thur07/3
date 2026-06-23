import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
//Importando telas
import Home from "./Home";
import Cadastro from "./Cadastro";
import Relatorio from "./Relatorio";
import Grafico from "./Grafico";
import Login from "./Login"
import NavD from "./NavDrawer";
import MaterialIcons from '@expo/vector-icons/AntDesign';

//criando uma constante que cria o estilo de navegação Stack
const BottomTab = createBottomTabNavigator();

const NavBottomTabs = () => {
    return (
        <NavigationContainer>
            <BottomTab.Navigator initialRouteName="Login">

                {/* Aqui definimos as telas, e o nome que queremos dar a elas */}
                {/* Em name definimos como ela vai ser chamada */}
                {/* Em component definimos qual tela vai ser renderizada */}

                <BottomTab.Screen name="Home" component={Home} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="home" color={color} size={size} />
                        )
                    }}
                />
                <BottomTab.Screen name="Login" component={Login} />
                <BottomTab.Screen name="MenuPrincipal" component={NavD} 
                    options={{
                        headerShown: false
                    }}
                />
                <BottomTab.Screen name="Cadastro" component={Cadastro} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="user-add" color={color} size={size} />
                        )
                    }}
                />
                <BottomTab.Screen name="Relatorio" component={Relatorio}
                    options={{
                        title: 'Tela de Relatório',
                        headerStyle: { backgroundColor: '#c4bdf3' },
                        headerTintColor: '#fff',
                        headerTitleAlign: 'center',
                        headerTitleStyle: { fontWeight: 'bold' },
                        tabBarIcon: ({ size, color }) => <MaterialIcons name='file-done' size={size} color={color} />
                    }} />
                <BottomTab.Screen name="Grafico" component={Grafico}
                    options={{
                        title: 'Tela de Gráfico',
                        headerStyle: { backgroundColor: '#f3eabd' },
                        headerTintColor: '#000000',
                        headerTitleAlign: 'center',
                        headerTitleStyle: { fontWeight: 'bold' },
                        tabBarIcon: ({ size, color }) => <MaterialIcons name='fund' size={size} color={color} />
                    }}
                />

            </BottomTab.Navigator>
        </NavigationContainer>
    );
};

export default NavBottomTabs;