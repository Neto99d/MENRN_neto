import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Registro from './components/Registro';
import Login from './components/Login';
import Home from './components/Home';

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  // initialRouteName={? 'Bienvenido' : 'Cargando'}>
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Inicio de Sesión"
          component={Login}
          options={{headerBackVisible: false}}
        />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen
          options={{headerBackVisible: false}}
          name="Home"
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
