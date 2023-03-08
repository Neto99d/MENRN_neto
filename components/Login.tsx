import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  WarningOutlineIcon,
  NativeBaseProvider,
  ScrollView,
} from 'native-base';
import axios from 'axios';
import {ToastAndroid} from 'react-native';
import {StackActions} from '@react-navigation/native';

export default function Login({navigation}) {
  const [initUser, setinitUser] = useState({
    username: '',
    password: '',
    serialqr: '',
  });

  //console.log(initUser);

  const nav = () => {
    navigation.navigate('Registro');
  };

  const navHome = () => {
    // Eliminar vista anterior y permanecer en actual
    navigation.dispatch(StackActions.replace('Home'));
  };

  async function getInfo() {
    let name = initUser.username;
    let password = initUser.password;
    let fvqr = initUser.serialqr.toUpperCase();

    const resp = await axios.post('http://172.24.10.97:3001/api/signin', {
      name,
      password,
      fvqr,
    });

    if (resp.data.message != 'Usuario no encontrado') {
      // console.log(resp.data.message);
      navHome();
    } else {
      // console.log(resp.data.message);
      ToastAndroid.show(
        'Error al iniciar sesión. Verifique sus credenciales',
        ToastAndroid.LONG,
      );
    }
  }

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Box alignItems="center" justifyContent="center" margin={5}>
          <Box w="100%" maxWidth="300px">
            <FormControl mb="5" isRequired>
              <FormControl.Label>Móvil</FormControl.Label>
              <Input
                type="text"
                placeholder="# móvil"
                maxLength={8}
                keyboardType="numeric"
                variant="rounded"
                onChangeText={text =>
                  setinitUser({...initUser, ['username']: text})
                }
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                Por favor proporcione un número de móvil válido. 8 dígitos
              </FormControl.ErrorMessage>

              <FormControl.HelperText>
                Escriba su usuario
              </FormControl.HelperText>
            </FormControl>
            <Divider />
            <FormControl mb="5" isRequired>
              <FormControl.Label>Contraseña</FormControl.Label>
              <Input
                type="password"
                placeholder="contraseña"
                maxLength={15}
                variant="rounded"
                onChangeText={text =>
                  setinitUser({...initUser, ['password']: text})
                }
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                Por favor proporcione una contraseña
              </FormControl.ErrorMessage>
              <FormControl.HelperText>
                Escriba su contraseña
              </FormControl.HelperText>
            </FormControl>
            <Divider />
            <FormControl mb="5">
              <FormControl.Label>Serial Carnet</FormControl.Label>
              <Input
                type="text"
                maxLength={9}
                placeholder={'ACLXXXXXX'}
                variant="rounded"
                onChangeText={text =>
                  setinitUser({...initUser, ['serialqr']: text})
                }
              />
              <FormControl.HelperText>
                Serial debajo del código QR de su carnet de identidad
              </FormControl.HelperText>
            </FormControl>
            <Divider />
            <Button onPress={() => getInfo()}>Entrar</Button>
            <Divider />
            <Divider />
            <Button onPress={() => nav()}>No tengo cuenta</Button>
          </Box>
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  );
}
