//Aqui é onde importamos todas as bibliotecas e componentes, igual ao React
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const Aula01 = () => {
  return (
    //O componente View é como se fosse uma DIV, um MAIN, um HEaDER, um FOOTER, ou seja, 
    // é um container para outros componentes. 
    // Ele tem a função de organizar os componentes dentro dele.
    <View style={styles.container}>
      {/* O componente Text é como se fosse um parágrafo, um título, um subtítulo, etc. */}
      <Text style={styles.titulo}>Hello, World!</Text>
      <Text> Olá esse é meu primeiro App!!! </Text>
      {/* O componente StatusBar é como se fosse a barra de status do dispositivo. */}
      <StatusBar style="auto" />
      <View style={styles.view1}>
        <Text style={styles.text1}>Texto 1</Text>
        <Text style={styles.text2}>Texto 2</Text>
        <Text style={styles.text3}>Texto 3</Text>
      </View>
    </View>
  );
}
//Para estilizar componentes se utiliza Style Sheet, que é uma forma de criar 
//estilos em React Native, parecido com o CSS, mas com algumas diferenças como 
//o uso de objetos em vez de seletores.
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 30,
  },
  view1: {
    width: '100vw',
    display: 'flex',
  },
  text1: {
    textAlign: 'left',
    color: 'blue',
  },
  text2: {
    textAlign: 'right',
    fontWeight: 'bold',
  },
  text3: {
    textAlign: 'center',
    color: 'red',
  },
});

export default Aula01
