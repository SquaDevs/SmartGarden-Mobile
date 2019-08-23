import React, { useState, useEffect } from 'react';
import { AsyncStorage, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container, Title, Content, SubTitle, BackButton, BackButtonText,
} from './styles.js';

export default function Perfil({ navigation }) {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('@SmartGarden:User')
      .then((userJSon) => {
        const user = JSON.parse(userJSon);
        console.log(user);
        setName(user.name);
        setUserName(user.username);
        setEmail(user.email);
      })
      .catch(console.error);

    // setName(user.name);
  });

  return (
    <Container>
      <Content>
        <Icon name="person-outline" size={40} color="#fff" />
        <Title>{name}</Title>

        <SubTitle>{`@${userName}`}</SubTitle>
        <SubTitle>{email}</SubTitle>

        <BackButton
          onPress={() => {
            navigation.navigate('Main');
          }}
        >
          <BackButtonText>Back</BackButtonText>
        </BackButton>
      </Content>
    </Container>
  );
}
