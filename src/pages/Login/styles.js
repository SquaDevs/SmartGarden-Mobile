import styled from 'styled-components/native';
import Color from '~/config/Colors';
import { StyleSheet, Animated } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background: ${props => (props.error ? '#FC4545' : Color)};
  padding-top: ${getStatusBarHeight() + 100}px;
  justify-content: center;
`;

export const Content = styled.View`
  flex: 1;
  max-height: 400px;
  z-index: 5;
  margin: 0 30px;
`;

export const Top = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;
export const Logo = styled.Image``;
export const Title = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;

  align-self: center;
`;

export const UserNameInput = styled.TextInput`
  margin-top: 10px;
  margin-bottom: 10px;
  height: 40;
  border-color: rgba(255, 255, 255, 0.8);
  border-width: ${StyleSheet.hairlineWidth}px;
  border-radius: 4px;
  color: #fff;
  padding: 10px;
`;

export const SignInButton = styled.TouchableOpacity`
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding: 12px;
  margin-top: 15px;
  background: #fff;
`;

export const SignInButtonText = styled.Text`
  color: ${props => (props.error ? '#FC4545' : Color)};
  font-weight: bold;
  font-size: 13px;
`;
