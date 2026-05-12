// import { ScrollView } from 'react-native'
// import Aula01 from './src/components/Aula01'
// import Aula02 from './src/components/Aula02'
// import Aula02_Flexbox from './src/components/Aula02_Flexbox'
// import Aula03 from './src/components/Aula03'


// export default function App() {
//   return(
//     <ScrollView style={{ flex:1, backgroundColor:'#fff'}}>
      
//       <Aula01/>
//       <Aula02/>
//       <Aula02_Flexbox/>
//       <Aula03/>

//     </ScrollView>
//   )
// }

import NavStack from './src/pages/NavStack';

export default function App() {
  return(
    <NavStack/>
  )
}
