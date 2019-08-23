import React from 'react';
import api from '~/services/api';
import { AsyncStorage, Alert } from 'react-native';

import {
  Container, Title, UserNameInput, Content, SignInButton, SignInButtonText,
} from './styles';

export default class Login extends React.Component {
  state = {
    user: null,
    email: '',
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    error:false,
    rightPass: false,
  };

  componentDidMount() {}

  signIn = async () => {
    const { username, name, email, password, confirmPassword} = this.state;
    
    
    const { navigate } = this.props.navigation;
    try {
      

      if (name === '') throw new Error('Prencha seu Name')
      if(username==='') throw new Error('Prencha seu Username')
      if (email === '') throw new Error('Prencha seu Email')
      if (password === '') throw new Error('Prencha sua Password')
      if (confirmPassword === '') throw new Error('Confirme sua Password')
      if (password !== confirmPassword) throw new Error('Seu password não bate')



      const response = await api.post('/user',{username,name,email,password});


     await Alert.alert(
        `User criado`,
        ``,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );

      this.setState({ rightPass: false });
    
      await navigate('Login');
    } catch (error) {
      let e =error+"";
      e=e.replace('Error:','');
      this.setState({ rightPass: true ,error:e});
    }

  };

  goBack = () => this.props.navigation.navigate('Login');


  render() {
    const {
      email, password, rightPass,
      name,
      username,
      error,
      confirmPassword,
    } = this.state;

    return (
      <Container error={rightPass}>
        <Content>
          <Title> Name</Title>
          <UserNameInput
            value={name}
            onChangeText={(text) => {
              console.log(text);
              this.setState({ name: text });
            }}
          />
          <Title> Username</Title>
          <UserNameInput
            value={username}
            onChangeText={(text) => {
              console.log(text);
              this.setState({ username: text });
            }}
          />
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
          <Title>Confirm Password </Title>
          <UserNameInput
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => {
              console.log(text);
              this.setState({ confirmPassword: text });
            }}
          />

          <SignInButton onPress={() => this.signIn()}>
            <SignInButtonText error={rightPass}>Sign Up</SignInButtonText>
          </SignInButton>

          <SignInButton onPress={() => this.goBack()}>
            <SignInButtonText error={rightPass}>Back </SignInButtonText>
          </SignInButton>

          {error && <Title>{error} </Title>}
        </Content>
      </Container>
    );
  }
}
