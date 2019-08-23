import React from 'react';
import { AsyncStorage, Picker } from 'react-native';
import {
  Container,
  Content,
  Title,
  SubTitle,
  UserNameInput,
  BackButton,
  BackButtonText,
  BackPicker,
  ElementPicker,
} from './styles.js';

import api from '~/services/api';

export default class PlantCreate extends React.Component {
  state = {
    title: '',
    description: '',
    type: 'invalid',
    error: null,
    rightPass: false,
  };

  addPlanta = async () => {
    try {
      const userJSon = await AsyncStorage.getItem('@SmartGarden:User');
      const { token } = JSON.parse(userJSon);
      const { navigate } = this.props.navigation;
      const {
        title, description, type, error,
      } = this.state;

      if (type === 'invalid' || type === '') throw new Error('Tipo de Planta Invalido');
         console.log(token)
      const { data } = await api.post(
        '/plant',
        { title, description, type },
        { headers: { authorization: `Bearer ${token}` } },
      );

      navigate('Main');
    } catch (error) {
      console.log(error);
      error = `${error}`.replace('Error:', '');

      this.setState({ rightPass: true, error });
    }
  };

  render() {
    const {
      title, description, error, rightPass,type,
    } = this.state;

    return (
      <Container error={rightPass}>
        <Content>
          <Title>Addicionar uma Planta</Title>
          <SubTitle>Nome da planta</SubTitle>
          <UserNameInput
            value={title}
            onChangeText={(text) => {
              console.log(text);
              this.setState({ title: text });
            }}
          />
          <SubTitle>Descrição da planta</SubTitle>
          <UserNameInput
            value={description}
            onChangeText={(text) => {
              console.log(text);
              this.setState({ description: text });
            }}
          />

          <BackPicker>
            <ElementPicker
              itemStyle={{ height: 44 }}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({ type: itemValue });
              }}
              selectedValue={type}
            >
              <Picker.Item label="Escolha o tipo da planta " value="invalid" />

              <Picker.Item label="Mostarda" value="mostarda" />
              <Picker.Item label="Cebolinha" value="cebolinha" />
            </ElementPicker>
          </BackPicker>

          <BackButton
            onPress={() => {
              this.addPlanta();
            }}
          >
            <BackButtonText error={rightPass}>Adicionar</BackButtonText>
          </BackButton>
          <BackButton
            onPress={() => {
              const { navigate } = this.props.navigation;
              navigate('Main');
            }}
          >
            <BackButtonText error={rightPass}>Voltar</BackButtonText>
          </BackButton>

          {error && <Title>{error}</Title>}
        </Content>
      </Container>
    );
  }
}
