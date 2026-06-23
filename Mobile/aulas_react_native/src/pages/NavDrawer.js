import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import MaterialIcons from '@expo/vector-icons/AntDesign';
//Importando telas
import Home from "./Home";
import Cadastro from "./Cadastro";
import Relatorio from "./Relatorio";
import Grafico from "./Grafico";
import Aula01 from "../components/Aula01"
import Aula02 from "../components/Aula02"
import Aula02_Flexbox from "../components/Aula02_Flexbox"
import Aula03 from "../components/Aula03"
import Aula04 from "../components/Aula04"
import Aula05 from "../components/Aula05"
import Aula06 from "../components/Aula06";
import Aula07 from "../components/Aula07";



//criando uma constante que cria o estilo de navegação Drawer
const Drawer = createDrawerNavigator();

const NavDrawer = () => {
    return (
        // <NavigationContainer>
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#000',
                },
                drawerInactiveTintColor: '#fff',
                drawerActiveBackgroundColor: '#649e65',
                drawerActiveTintColor: 'black'
            }}
        >
            {/* Aqui definimos as telas, e o nome que queremos dar a elas */}
            {/* Em name definimos como ela vai ser chamada */}
            {/* Em component definimos qual tela vai ser renderizada */}
            <Drawer.Screen name="Home" component={Home}
                options={{ drawerIcon: ({ size, color }) => <MaterialIcons name='home' size={size} color={color} /> }}
            />
            <Drawer.Screen name="Cadastro" component={Cadastro}
                options={{ drawerIcon: ({ size, color }) => <MaterialIcons name='plus-circle' size={size} color={color} /> }}
            />
            <Drawer.Screen name="Relatorio" component={Relatorio}
                options={{
                    title: 'Tela de Relatório',
                    headerStyle: { backgroundColor: '#c4bdf3' },
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontWeight: 'bold' },
                    drawerIcon: ({ size, color }) => <MaterialIcons name='file-done' size={size} color={color} />
                }} />
            <Drawer.Screen name="Grafico" component={Grafico}
                options={{
                    title: 'Tela de Gráfico',
                    headerStyle: { backgroundColor: '#f3eabd' },
                    headerTintColor: '#000000',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontWeight: 'bold' },
                    drawerIcon: ({ size, color }) => <MaterialIcons name='fund' size={size} color={color} />
                }}
            />
            <Drawer.Screen name="Aula 01" component={Aula01}
                options={{ drawerIcon: ({ size, color }) => <MaterialIcons name='align-left' size={size} color={color} /> }}
            />
            <Drawer.Screen name="Aula 02" component={Aula02}
                options={{ drawerIcon: ({ size, color }) => <MaterialIcons name='align-left' size={size} color={color} /> }}
            />
            <Drawer.Screen name="Aula 02 - Flexbox" component={Aula02_Flexbox}
                options={{ drawerIcon: ({ size, color }) => <MaterialIcons name='align-left' size={size} color={color} /> }}
            />
            <Drawer.Screen name="Aula 03" component={Aula03}
                options={{ drawerIcon: ({ size, color }) => <MaterialIcons name='align-left' size={size} color={color} /> }}
            />
            <Drawer.Screen name="Aula 04" component={Aula04}
                options={{ drawerIcon: ({ size, color }) => <MaterialIcons name='align-left' size={size} color={color} /> }}
            />
            <Drawer.Screen name="Aula 05" component={Aula05}
                options={{ drawerIcon: ({ size, color }) => <MaterialIcons name='align-left' size={size} color={color} /> }}
            />
            <Drawer.Screen name="Aula 06" component={Aula06}
                options={{ drawerIcon: ({ size, color }) => <MaterialIcons name='align-left' size={size} color={color} /> }}
            />
            <Drawer.Screen name="Aula 07" component={Aula07}
                options={{ drawerIcon: ({ size, color }) => <MaterialIcons name='align-left' size={size} color={color} /> }}
            />

        </Drawer.Navigator>
        // </NavigationContainer> 
    );
};

export default NavDrawer;