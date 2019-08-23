import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';


import { useSelector } from 'react-redux';

import { AsyncStorage, Animated } from 'react-native';
import api from '~/services/api';

import { PanGestureHandler, State } from 'react-native-gesture-handler';

import Header from '~/components/Header';
import Tabs from '~/components/Tabs';
import Menu from '~/components/Menu';

import {
  Container,
  Content,
  Card,
  CardContent,
  CardHeader,
  Title,
  Description,
  SubDescription,
  CardFooter,
  Annotation,
} from './styles';

import { UserNameInput } from '../Login/styles';

export default function Main({ navigation }) {
  let offset = 0;
  const translateY = new Animated.Value(0);
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

  // const userJson = await AsyncStorage.getItem('@SmartGarden:User');
  // console.log(userJson)
  const [name, setName] = useState('');
  const [plant, setPlant] = useState({});
  // const plant = useSelector(state=>state.plant);


  let up = 0;
  useEffect(() => {
    AsyncStorage.getItem('@SmartGarden:User')
      .then((userJSon) => {
        const user = JSON.parse(userJSon);
        console.log(user);
        setName(user.name);
      })
      .catch(console.error);
    AsyncStorage.getItem('@SmartGarden:LastAnalisys').then((plantAn) => {
      const ana = JSON.parse(plantAn);
  
      // if (!(typeof ana === 'object') && Object.keys(ana).length > 0) {
      // if (up < 2) {
        console.log(ana)
      if (ana.createdAt!==undefined){
        ana.createdAt = new Date(ana.createdAt).toLocaleDateString('en-US', {
          day: '2-digit',
          year: '2-digit',
          month: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        });

      }

      if (plant !== ana) {
        setPlant(ana);
      }

      // }
      // }

      console.log(ana);
      up += 1;
      // setPlant(ana);
    });
    // setName(user.name);
  },[]);

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true },
  );

  function onHandlerStateChanged(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened;
      const { translationY } = event.nativeEvent;
      offset += translationY;

      if (translationY >= 100) {
        opened = true;
      } else {
        translateY.setValue(offset);
        translateY.setOffset(0);
        opened = false;
      }

      Animated.timing(translateY, {
        toValue: opened ? 380 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        offset = opened ? 380 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });
    }
  }




  return (
    <Container>
      <Header name={name} />
      <Content>
        <Menu translateY={translateY} {...navigation} />

        <PanGestureHandler
          onGestureEvent={animatedEvent}
          onHandlerStateChange={onHandlerStateChanged}
        >
          <Card
            style={{
              transform: [
                {
                  translateY: translateY.interpolate({
                    inputRange: [-450, 0, 380],
                    outputRange: [-50, 0, 380],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            }}
          >
            <CardHeader>
              <Icon name="wb-cloudy" size={29} color="#babaca" />
              <Icon name="wb-sunny" size={29} color="#babaca" />
            </CardHeader>
            <CardContent>
              <Title>{plant.title ? 'Last Update' : 'Nothing to show'} </Title>
              <Description>{plant.title ? plant.title : ''}</Description>


              <SubDescription>{plant.stRisco &&`  Risco: ${endum.risco[plant.stRisco]}`}</SubDescription>
              <SubDescription>{plant.stTemp &&` Temperatura: ${endum.temp[plant.stTemp]}`}</SubDescription>
              <SubDescription>{plant.stUmi &&` Humidade: ${endum.hum[plant.stUmi]}`}</SubDescription>


            </CardContent>
            <CardFooter>
              <Annotation>{plant.createdAt && plant.createdAt}</Annotation>
            </CardFooter>
          </Card>
        </PanGestureHandler>
      </Content>

      <Tabs translateY={translateY} {...navigation} />
    </Container>
  );
}


