import styled from 'styled-components/native';
import Color from '~/config/Colors';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { StyleSheet } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background: ${Color};
  padding-top: ${getStatusBarHeight()}px;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  align-self: center;
`;

export const SubTitle = styled.Text`
  font-size: 15px;
  color: #fff;
  font-weight: bold;
  align-self: center;
`;

export const Content = styled.View`
  flex: 1;
  max-height: 400px;
  z-index: 5;
  margin: 0 30px;
`;

export const Nav = styled.View`
  margin-top: 30px;
  align-self: stretch;
  border-top-width: ${StyleSheet.hairlineWidth}px;
  border-top-color: rgba(255, 255, 255, 0.8);
`;
export const NavItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 0 12px 0;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: rgba(255, 255, 255, 0.8);
`;
export const NavText = styled.Text`
  font-size: 15px;
  color: #fff;
  margin-left: 20px;
`;

export const BackButton = styled.TouchableOpacity`
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding: 12px;
  margin-top: 15px;
  background: #fff;
`;

export const BackButtonText = styled.Text`
  color: ${props => (props.error ? '#FC4545' : Color)};
  font-weight: bold;
  font-size: 13px;
`;
