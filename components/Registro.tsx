import React, {useState} from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  WarningOutlineIcon,
  NativeBaseProvider,
  Text,
  View,
  ScrollView,
  AspectRatio,
  useToast,
} from 'native-base';
import axios from 'axios';
import {Camera} from 'react-native-camera-kit';
import {ToastAndroid} from 'react-native';
import {StackActions} from '@react-navigation/native';

export default function Registro({navigation}) {
  const showToast = (value: Boolean) => {
    if (value) {
      ToastAndroid.show('Registrado con Exito', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Error en el Registro', ToastAndroid.SHORT);
    }
  };
  // Estados para info entrada manual y por QR
  const [pass_name, setpassname] = useState({
    movil: '',
    pass: '',
  });

  const [userqr, setUserqr] = useState({
    N: '',
    A: '',
    CI: '',
    FV: '',
    R: true,
  });

  // Funcion para procesar informacion de QR para poder manipularla
  function procesar(value: any) {
    let infoProcesada = value
      .replace('N:', '') // nombre
      .replace('A:', '') // apellidos
      .replace('CI:', '') // carnet identidad
      .replace('FV:', '') // serial debajo de QR carnet
      .split('\r\n', 4);

    // Entrando la info extraida en el estado de usuario
    setUserqr({
      ...userqr,
      ['N']: infoProcesada[0],
      ['A']: infoProcesada[1],
      ['CI']: infoProcesada[2],
      ['FV']: infoProcesada[3],
    });
  }

  const nav = () => {
    navigation.navigate('Inicio de Sesión');
  };

  // Funcion Crear Usuario Boton//
  const handleSubmit = async () => {
    let name = pass_name.movil;
    let password = pass_name.pass;
    let nombre = userqr.N;
    let apellidos = userqr.A;
    let ci = userqr.CI;
    let isRegister = userqr.R;
    let fvqr = userqr.FV;

    const resp = await axios.post('http://172.24.10.97:3001/api/signup', {
      name,
      password,
      nombre,
      apellidos,
      ci,
      isRegister,
      fvqr,
    });

    // console.log(resp.data);

    if (resp.data.message != 'Error') {
      showToast(true);
      nav();
    } else {
      showToast(false);
    }
  };

  // SERVICIOS //

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Box alignItems="center" justifyContent="center" margin={5}>
          <Box w="100%" maxWidth="300px">
            <FormControl
              mb="5"
              isRequired
              isInvalid={pass_name.movil.length < 8}>
              <FormControl.Label>Móvil</FormControl.Label>
              <Input
                type="text"
                placeholder="# móvil"
                maxLength={8}
                keyboardType="numeric"
                variant="rounded"
                onChangeText={text =>
                  setpassname({...pass_name, ['movil']: text})
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
            <FormControl mb="5" isRequired isInvalid={pass_name.pass == ''}>
              <FormControl.Label>Contraseña</FormControl.Label>
              <Input
                type="password"
                placeholder="contraseña"
                maxLength={15}
                variant="rounded"
                onChangeText={text =>
                  setpassname({...pass_name, ['pass']: text})
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
              <FormControl.Label>Nombre</FormControl.Label>
              <Input
                type="text"
                isReadOnly
                maxLength={20}
                value={userqr.N}
                variant="rounded"
              />
              <FormControl.HelperText>Escaneo de QR</FormControl.HelperText>
            </FormControl>
            <Divider />
            <FormControl mb="5">
              <FormControl.Label>Apellidos</FormControl.Label>
              <Input
                type="text"
                maxLength={20}
                isReadOnly
                value={userqr.A}
                variant="rounded"
              />
              <FormControl.HelperText>Escaneo de QR</FormControl.HelperText>
            </FormControl>
            <Divider />
            <FormControl mb="5">
              <FormControl.Label>Carnet de Identidad</FormControl.Label>
              <Input
                type="password"
                maxLength={11}
                isReadOnly
                value={userqr.CI}
                variant="rounded"
              />
              <FormControl.HelperText>Escaneo de QR</FormControl.HelperText>
            </FormControl>
            {pass_name.movil == '' ? (
              <Button isDisabled>Siguiente</Button>
            ) : pass_name.pass == '' ? (
              <Button isDisabled>Siguiente</Button>
            ) : userqr.N == '' ? (
              <Button isDisabled>Siguiente</Button>
            ) : (
              <Button onPress={() => handleSubmit()}>Registrar</Button>
            )}
          </Box>
        </Box>
        {userqr.N == '' ? (
          <View margin={5}>
            <Text textAlign={'center'}>
              Escanee el código QR del carnet de identidad
            </Text>
            <AspectRatio>
              <Camera
                // Barcode props
                scanBarcode={true}
                onReadCode={(event: {nativeEvent: {codeStringValue: any}}) =>
                  procesar(event.nativeEvent.codeStringValue)
                }
              />
            </AspectRatio>
          </View>
        ) : (
          ''
        )}
      </ScrollView>
    </NativeBaseProvider>
  );
}
