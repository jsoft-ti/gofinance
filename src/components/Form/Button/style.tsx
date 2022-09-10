import React from "react";

import { Container, Title } from "./styles";
import { TouchableOpacityProps } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";

interface props extends RectButtonProps{
  title: string;
  onPress: () => void;
}
export function Button({title, onPress, ...rest} : props){
  return(
    <Container {...rest} onPress={onPress}>
        <Title>{title}</Title>
    </Container>
  );
}