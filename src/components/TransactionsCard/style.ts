import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { FlatList } from "react-native";
import { DataListProps } from '../../screens/Dashboard';

interface TransactionTypeProps {
  type: 'positive' | 'negative';
}
export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.shape};
  border-radius: 5px;
  padding: 17px 24px;
  margin-top: 10px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-bottom: 16px;
`;

export const Amount = styled.Text<TransactionTypeProps>`
   font-size: ${RFValue(20)}px;
   margin-top: 2px;
   font-family: ${({ theme }) => theme.fonts.regular};
   color: ${({ theme, type}) => 
    type === 'positive' ? theme.colors.sucess : theme.colors.atention};

`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 19px;
`;

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color:  ${({theme}) => theme.colors.text};  

`;

export const CategoryName = styled.Text`
  margin-left: 17px;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Date = styled.Text`
    font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const TransactionList = styled(
  FlatList as new () => FlatList<DataListProps>
  ).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace()
  }
})`

`;
