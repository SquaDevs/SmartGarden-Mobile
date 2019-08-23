import React, { Component } from 'react';
import api from '~/services/api';
import { AsyncStorage, Animated, Alert } from 'react-native';
import {
  Container,
  Content,
  Title,
  Nav,
  NavText,
  NavItem,
  BackButton,
  BackButtonText,
} from './styles.js';

export default class PlantList extends Component {
  state = {
    dfs: 'ds',
    error: null,
    plants: null,
  };

  componentDidMount() {
    this.getPlants();
  }

  getPlants = async () => {
    const userJSon = await AsyncStorage.getItem('@SmartGarden:User');
    const { token } = JSON.parse(userJSon);
    try {
      const { data } = await api.get('/plant', { headers: { authorization: `Bearer ${token}` } });
      console.log(data);
      this.setState({ plants: data.plants.docs, error: null });
    } catch (error) {
      console.log(error);
      this.setState({ error: 'Deu erro', plants: null });
    }
  };

  _onDelete = async (plant) => {
    const { title, _id } = plant;
    const userJSon = await AsyncStorage.getItem('@SmartGarden:User');
    const { token } = JSON.parse(userJSon);

    Alert.alert(
      `Voce gostaria mesmo de deletar a "${title}" `,
      '',
      [
        { text: 'Não', onPress: () => console.log('OK Pressed') },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const { data } = await api.delete(`/plant/${_id}`, {
                headers: { authorization: `Bearer ${token}` },
              });

              Alert.alert('Planta apagada', '', [
                { text: 'OK', onPress: () => this.getPlants() },
                { cancelable: false },
              ]);
            } catch (error) {
              console.log(error);
              Alert.alert('Alguma coisa deu errado tente mais tarde', '', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
                { cancelable: false },
              ]);
            }
          },
        },
      ],
      { cancelable: false },
    );
  };

  render() {
    const { plants, error } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content>
          <Title>Todas as suas plantas</Title>
          <Nav>
            {plants
              && plants.map(plant => (
                <NavItem key={plant._id}>
                  <NavText
                    onPress={() => {
                      console.log(this.props);
                      navigate('PlantAbout', { plant });
                      console.log('sss');
                    }}
                    onLongPress={() => {
                      this._onDelete(plant);
                    }}
                  >
                    {plant.title}{' '}
                  </NavText>
                </NavItem>
              ))}
          </Nav>

          <Title>{error && error}</Title>

          <BackButton
            onPress={() => {
              this.props.navigation.navigate('Main');
            }}
          >
            <BackButtonText>Voltar</BackButtonText>
          </BackButton>
        </Content>
      </Container>
    );
  }
}
