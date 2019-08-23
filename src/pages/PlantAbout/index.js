import React, { Component } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import {
  Container,
  Content,
  Title,
  SubTitle,
  Nav,
  NavItem,
  NavText,
  BackButton,
  BackButtonText,
} from './styles.js';
import api from '~/services/api';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Creators as PlantActions } from '~/store';
// import AnimatedLoader from 'react-native-animated-loader'; s


 class PlantAbout extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   plant: {
    //     _id: '5ca16ec54047ae80e7472812',
    //     title: 'yellow Bean',
    //     description: 'My favorite plant  infffff the wodrld',
    //     owner: '5ca10e985feb5a53f65b7274',
    //     createdAt: '2019-04-01T01:52:05.496Z',
    //     token: '$2a$08$ppqzhgL0MaaFyZiNxye4NOICCxoCim6VGlYH3r8y3dKmgtdB8PRYC',
    //   },
    //   plantList: [],
    // };
    const { navigation } = this.props;
    const plant = navigation.getParam('plant', {});
    this.state = {
      plant,
      loading:false
    };

    this.month = [];
    this.month[0] = 'jan';
    this.month[1] = 'feb';
    this.month[2] = 'mar';
    this.month[3] = 'abr';
    this.month[4] = 'mai';
    this.month[5] = 'jun';
    this.month[6] = 'ju;';
    this.month[7] = 'ago';
    this.month[8] = 'set';
    this.month[9] = 'oto';
    this.month[10] = 'nov';
    this.month[11] = 'dez';
  }


  componentDidMount() {
    this.getPlantData();
  }

  format = date => new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    year: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  getPlantData = async () => {
    const { _id } = this.state.plant;
    // const {format}= this;
    const userJSon = await AsyncStorage.getItem('@SmartGarden:User');
    const { token } = JSON.parse(userJSon);
    try {
      const { data } = await api.get(`/plant/${_id}/data`, {
        headers: { authorization: `Bearer ${token}` },
      });
      console.log(data);
      const { docs: plantData } = data.plantData;
      plantData.map((plant) => {
        plant.createdAtFr = this.format(plant.createdAt);
      });

      this.setState({ plantList: plantData, error: null });
    } catch (error) {
      console.log(error);
      this.setState({ error: 'Deu erro', plantData: [null] });
    }
  };

  onItemHandler = async (plantDATA) => {
    const {
      title, description, createdAt, type,
    } = this.state.plant;
    const { plant } = this.state;
    const mes = this.month[new Date().getMonth()];
    const { temperature, airHumidity, groundHumidity } = plantDATA;

    const obj = {
      insumo: type,
      mes,
      tempMax: 24,
      tempMin: 18,
      tempRel: temperature,
      umiRel: airHumidity,
      aparencia: 'amarelada',
    };

    console.log(obj);
    try {
      const userJSon = await AsyncStorage.getItem('@SmartGarden:User');
      const { token } = JSON.parse(userJSon);
      // const { data } = await api.post('/plant/checker', [obj], {
      //   headers: { authorization: `Bearer ${token}` },
      // });

      const data = await fetch('http://localhost:5000/api/analisar', {
        method: 'POST',
        body: JSON.stringify([obj]),
      });

      const json = await data.json();
      console.log('data');

      console.log(json);

      await AsyncStorage.setItem(
        '@SmartGarden:LastAnalisys',
        JSON.stringify({ ...json, ...plant }),
      );



      const endum = {
        hum: {
          medio: 'Hoje o ar é o ideal',
          baixo: 'O ar esta seco hoje',
          alto: 'O ar esta humido hoje',
        },
        temp: {
          medio: 'Temp perfeita por aqui',
          baixo: 'Está frio por aqui',
          alto: 'Muito calor por aqui',
        },
        risco: {
          medio: 'Estou bem,  mas vem me ver hj , preciso de algo ',
          baixo: 'Esta td bem comigo',
          alto: 'Não me sinto bem , preciso de cuidados ',
        },
      };

      Alert.alert(
        `${title}`,
        `
          Humidade: ${endum.hum[json.stUmi]}
          Temperatura: ${endum.temp[json.stTemp]}
          Risco: ${endum.risco[json.stRisco]}
        `,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );

    PlantActions.addPlant({ ...json, ...plant });

    } catch (error) {
      console.log('error');
      console.log(error);
    }
  };

  render() {
    const { navigation } = this.props;
    // const itemId = navigation.getParam('itemId', 'NO-ID');
    // const otherParam = navigation.getParam('otherParam', 'some default value');

    const {
      title, description, createdAt, type,
    } = this.state.plant;
    const { loading}=this.state;
    // console.log();
    // const title
    // const description
    // const createdAt

    const { plantList } = this.state;

    const dateOBJ = new Date(createdAt);
    const date = `${dateOBJ.getDate()}/${dateOBJ.getMonth()}/${dateOBJ.getFullYear()}`;

    return (
      <Container>
        <Content>
          <Title>{title}</Title>
          <SubTitle>{`Descrição: ${description}`}</SubTitle>
          <SubTitle>{`Data de cadastro: ${date} `}</SubTitle>
          <SubTitle>{`Tipo: ${type} `}</SubTitle>
          <Nav>
            {plantList
              && plantList.map(plant => (
                <NavItem key={plant._id} onPress={() => console.log('ss')}>
                  <NavText onPress={() => this.onItemHandler(plant)}>
                    {`Humidades: ar ${plant.airHumidity}, terra ${plant.groundHumidity}; temp ${
                      plant.temperature
                    } at ${plant.createdAtFr} `}
                  </NavText>
                </NavItem>
              ))}
          </Nav>
          <BackButton
            onPress={() => {
              this.props.navigation.navigate('PlantList');
            }}
          >

            <BackButtonText>Voltar</BackButtonText>
            {/* <AnimatedLoader visible={loading} overlayColor="rgba(255,255,255,0.75)" animationStyle={styles.lottie} speed={1} /> */}


          </BackButton>
        </Content>
      </Container>
    );
  }
}


export default PlantAbout;
