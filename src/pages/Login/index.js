import React from 'react';
import api from '~/services/api';
import { AsyncStorage } from 'react-native';

import {
  Container, Title, UserNameInput, Content, SignInButton, SignInButtonText,
} from './styles';

export default class Login extends React.Component {
  state = {
    user: null,
    email: '',
    password: '',
    rightPass: false,
  };

  componentDidMount() {
    this.storageChecker();
  }

  storageChecker = async () => {
    try {
      const last = await AsyncStorage.getItem('@SmartGarden:LastAnalisys');
      await AsyncStorage.setItem('@SmartGarden:LastAnalisys', JSON.stringify({}));
      if (last === undefined || last === null || last === ''||last ==='{}') {
        await AsyncStorage.setItem('@SmartGarden:LastAnalisys', JSON.stringify({}));
      }
    } catch (error) {}
  };

  signIn = async () => {
    const { email, password } = this.state;
    const { navigate } = this.props.navigation;
    try {
      console.log(1);
      const { data } = await api.post('/auth', { email, password });
      console.log(data);

      this.setState({ rightPass: false });
      await AsyncStorage.setItem('@SmartGarden:User', JSON.stringify(data));
      navigate('Main');
    } catch (error) {
      console.log(555);
      console.log(error);
      this.setState({ rightPass: true });
    }
    //   try {
    //   let response = await fetch(
    //     'https://facebook.github.io/react-native/movies.json',
    //   );
    //   let responseJson = await response.json();
    //  console.log(responseJson)
    // } catch (error) {
    //   console.error(error);
    // }
  };
  signUp =() => {
    const { navigate } = this.props.navigation;
    try {
      navigate('SignUp')
    } catch (error) {
      this.setState({ rightPass: true });
    }
  }



  render() {
    const {
      email, password, rightPass, user,
    } = this.state;

    return (
      <Container error={rightPass}>
        <Content>
          <Title> E-mail</Title>
          <UserNameInput
            value={email}
            onChangeText={(text) => {
              console.log(text);
              this.setState({ email: text });
            }}
          />
          <Title>Password </Title>
          <UserNameInput
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              console.log(text);
              this.setState({ password: text });
            }}
          />

          <SignInButton onPress={() => this.signIn()}>
            <SignInButtonText error={rightPass}>Log In</SignInButtonText>
          </SignInButton>

          <SignInButton onPress={() => this.signUp()}>
            <SignInButtonText error={rightPass}>Sign Up</SignInButtonText>
          </SignInButton>

          {user && <Title>{user} </Title>}
        </Content>
      </Container>
    );
  }
}
