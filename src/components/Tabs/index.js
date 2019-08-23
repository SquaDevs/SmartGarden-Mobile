import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container, TabsContainer, TabItem, TabText,
} from './styles';

export default function Tabs({ translateY, navigate }) {
  return (
    <Container
      style={{
        transform: [
          {
            translateY: translateY.interpolate({
              inputRange: [0, 380],
              outputRange: [0, 30],
              extrapolate: 'clamp',
            }),
          },
        ],

        opacity: translateY.interpolate({
          inputRange: [0, 380],
          outputRange: [1, 0.2],
          extrapolate: 'clamp',
        }),
      }}
    >
      <TabsContainer>
        <TabItem
          onPress={() => {
            navigate('PlantCreate');
          }}
        >
          <Icon
            name="add-circle"
            size={36}
            color="#FFF"
            onPress={() => {
              navigate('PlantCreate');
            }}
          />
          <TabText
            onPress={() => {
              navigate('PlantCreate');
            }}
          >
            Adicionar Planta
          </TabText>
        </TabItem>
        {/* <TabItem>
          <Icon name="remove-circle" size={24} color="#FFF" />
          <TabText>Remover Planta</TabText>
        </TabItem> */}
        <TabItem
          onPress={() => {
            navigate('PlantList');
          }}
        >
          <Icon
            name="format-list-bulleted"
            size={36}
            color="#FFF"
            onPress={() => {
              navigate('PlantList');
            }}
          />
          <TabText
            onPress={() => {
              navigate('PlantList');
            }}
          >
            Listar Plantas
          </TabText>
        </TabItem>

        {/* <TabItem>
          <Icon name="lock" size={24} color="#FFF" />
          <TabText>Bloquear cartão</TabText>
        </TabItem> */}
      </TabsContainer>
    </Container>
  );
}
