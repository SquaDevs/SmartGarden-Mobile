import React from 'react';
import Proptypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import logo from '~/assets/farming.png';

import {
  Container, Top, Title, Logo,
} from './styles';

const Header  = ({ name }) => {
  return (
    <Container>
      <Top>
        <Logo source={logo} />
        <Title>{name}</Title>
      </Top>
      <Icon name="keyboard-arrow-down" size={20} color="#FFF" />
    </Container>
  );
}

Header.protoTypes = {
  name: Proptypes.string,
};
export default Header;
