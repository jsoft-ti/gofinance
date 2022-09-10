import styled, {css} from "styled-components/native";
import { TouchableOpacity } from "react-native";
import {Feather} from "@expo/vector-icons"
import { RFValue } from "react-native-responsive-fontsize";
import {RectButton} from "react-native-gesture-handler";
import {RectButtonProps} from "react-native-gesture-handler";

interface IconProps {
  type: 'up' | 'down';
}

interface ContainerProps{
  isActive: boolean;
  type: 'up' | 'down';
}

export const Container = styled.View<ContainerProps>`
  width: 48%;

 

  ${({isActive, type}) => isActive && type === 'up' && css`
    background-color: ${({theme}) => theme.colors.sucess_light};
    border: none;
  `};
  ${({isActive, type}) => isActive && type === 'down' && css`
    background-color: ${({theme}) => theme.colors.atention_light};
    border: none;
  `};
`;

  export const Button = styled(RectButton)`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 16px 19px;
    border: 1.5px solid ${({ theme }) => theme.colors.text};
    border-radius: 5px;
  `

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({theme, type}) => 
  type === 'up' ? theme.colors.sucess : theme.colors.atention};
`;