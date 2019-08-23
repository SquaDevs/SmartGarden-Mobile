import React from 'react';
import Color from '~/config/Colors';

import { AsyncStorage, Animated, Button } from 'react-native';
import QRCode from 'react-native-qrcode';

import Icon from 'react-native-vector-icons/MaterialIcons';
import logo from '~/assets/farming.png';
import {
  Container,
  Logo,
  Code,
  Nav,
  NavItem,
  NavText,
  SignOutButton,
  SignOutButtonText,
  BackB,
  BackBTXT,
} from './styles';

export default function Menu({ translateY, navigate }) {
  return (
    <Container
      style={{
        opacity: translateY.interpolate({
          inputRange: [0, 150],
          outputRange: [0, 1],
        }),
      }}
    >
      <Code>
        <Logo source={logo} />
        {/* <QRCode value="Ian is awsome" size={80} fgColor="#fff" bgColor={Color} /> */}
      </Code>
      <Nav>
        <NavItem>
          <Icon
            name="person-outline"
            size={20}
            color="#fff"
            onPress={() => {
              navigate('Perfil');
              console.log(navigate);
            }}
          />
          <NavText>Perfil</NavText>
        </NavItem>
        <NavItem>
          <Icon name="help-outline" size={20} color="#fff" />
          <NavText>Sobre Nos</NavText>
        </NavItem>

        {/* <NavItem>
          <Icon name="credit-card" size={20} color="#fff" />
          <NavText>Configurar Cartao</NavText>
        </NavItem> */}
      </Nav>

      <SignOutButton
        onPress={async () => {
          await AsyncStorage.setItem('@SmartGarden:User', JSON.stringify({}));
          navigate('Login');
        }}
      >
        <SignOutButtonText>LogOut</SignOutButtonText>
      </SignOutButton>
    </Container>
  );
}
