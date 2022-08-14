import React from 'react';

import { 
  Container, 
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  UserGreeting,
  UserName, 
  User,
  Icon,
  HighlightCards,
  Transactions,
  Title,

} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionsCard';
import { TransactionList } from '../../components/TransactionsCard/style';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export interface DataListProps extends TransactionCardProps{
  id:String;
}

export function Dashboard(){
  const data: DataListProps[] = [{
    id: '1',
    type: 'positive',
    title: "Desenvolvimento de site",
    amount: "R$ 12.000,00",
    category: {
              name: "Vendas",
              icon: "dollar-sign"
            },
    date : "13/04/2020"
  },
  {
    id: '2',
    type: 'negative',
    title: "Hamburgueria Pizzy",
    amount: "R$ 59,00",
    category: {
              name: "Alimentação",
              icon: "coffee"
            },
    date : "10/04/2020"
  },
  {
    id: '3',
    type: 'negative',
    title: "Aluguel do Apartamento",
    amount: "R$ 1.200,00",
    category: {
              name: "Vendas",
              icon: "shopping-bag"
            },
    date : "10/04/2020"
  }];

  return(
    <Container>
      <Header>
        <UserWrapper>
        <UserInfo>
        <Photo source={{uri: 'https://avatars.githubusercontent.com/u/9766823?v=4'}}/>
          <User>
            <UserGreeting>Olá</UserGreeting>
            <UserName>João</UserName>
          </User>
        </UserInfo>
        <Icon name='power'/>
        </UserWrapper>
      </Header>
      <HighlightCards 
        
      >
        <HighlightCard
          type='up' 
          title='Entradas' 
          amount='R$ 17.400,00' 
          lastTransaction='Última Entrada dia 13 de abril'/>
        <HighlightCard 
          type='down'
          title='Saída' 
          amount='R$ 1.259,00' 
          lastTransaction='Última Saída dia 3 de abril'/>
        <HighlightCard 
          type='total'
          title='Total' 
          amount='R$ 16.141,00' 
          lastTransaction='01 a 6 de abril'/>
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionList data={data}
          renderItem = {({ item }) => <TransactionCard
                                      data = {item}/>}
          keyExtractor = {item => item.id}
        />
        

      </Transactions>
    </Container>
  )
}

/*const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'#f00',
    justifyContent: 'center',
    alignItems: 'center'
  }
})*/
