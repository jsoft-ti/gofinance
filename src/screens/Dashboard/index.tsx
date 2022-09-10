import React, { useCallback } from 'react';

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
  LogOutButton,
  HighlightCards,
  Transactions,
  Title,
  LoadContainer,

} from './styles';
import { ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionsCard';
import { TransactionList } from '../../components/TransactionsCard/style';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
export interface DataListProps extends TransactionCardProps{
  id:String;
}
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import {useTheme} from 'styled-components'

interface HighlightProps{
  amount: string
  lastTransactions: string;
}
interface HighlightData{
  entries: HighlightProps;
  expansive: HighlightProps;
  total: HighlightProps;
 
}
export function Dashboard(){
  const theme = useTheme();
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);
  const [isLoading, setIsloading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);

  function myGetLastTransaction(collection: DataListProps[],
    type: 'positive' | 'negative'){

    const result = Math.max.apply(Math, collection.filter((transaction: DataListProps) => transaction.data.type === type).map((transaction: DataListProps) => new Date(transaction.data.date).getTime()))
    const resultFormat  = new Date(result).toLocaleDateString('pt-Br');
    console.log("=============================================");
    console.log(resultFormat);
    const finalDate = new Date(Intl.DateTimeFormat('pt-BR',{
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    }).format(new Date(resultFormat)))

    return `${finalDate.getDate()} de ${finalDate.toLocaleString('pt-BR', {month: 'long'})}`
  }

  function getLastTransactionDate(
    collection: DataListProps[],
     type: 'positive' | 'negative')
     {
    const lastTransactionEntries = 
    new Date(Math.max.apply(Math,collection.filter((transaction: DataListProps) => transaction.data.type === type).
    map((transaction: DataListProps) => new Date(transaction.data.date).getTime()))).toLocaleDateString('pt-Br');

    return Intl.DateTimeFormat('pt-BR',{
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    }).format(new Date(lastTransactionEntries))
  }

  async function loadTransactions (){
    const datakey = "@gofinances:transactions"
    const response = await AsyncStorage.getItem(datakey)
    const transactions = response ? JSON.parse(response) : []
    let entriesTotal = 0;
    let expensiveTotal = 0;
    
    const transactionFormatted:DataListProps[] = transactions.map((item: DataListProps) => {

      if(item.data.type == 'positive'){
        entriesTotal += Number(item.data.amount)
      }else {
        expensiveTotal += Number(item.data.amount)
      }


      const amount = Number (item.data.amount).toLocaleString("pt-BR", {
        style:'currency',
        currency: 'BRL'
      });

      

      const date = new Date(item.data.date);
      
      const dateFormatted = Intl.DateTimeFormat('pt-BR',{
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(date)

      return{
        id: item.id,
        data:{
          name: item.data.name,
          amount: amount,
          type: item.data.type,
          category: item.data.category,
          date: dateFormatted
        }
      }
    })
    console.log(transactionFormatted)
    setTransactions(transactionFormatted)
    
    myGetLastTransaction(transactionFormatted, 'positive');

    const lastTransactionEntries =  myGetLastTransaction(transactionFormatted, 'positive');
    const lastTransactionExpenses =  myGetLastTransaction(transactionFormatted, 'negative');

    const total = entriesTotal - expensiveTotal;

    

    setHighlightData({
      expansive:{
        amount: expensiveTotal.toLocaleString('pt-BR',{
          currency: 'BRL',
          style: 'currency'
        }),
        lastTransactions: "Ultima saída " + lastTransactionExpenses
      },
      entries:{
        amount: entriesTotal.toLocaleString('pt-BR',{
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransactions: "Última entrada " + lastTransactionEntries
      },
      total:{
        amount: total.toLocaleString('pt-BR',{
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransactions: ''
      }
    })

    setIsloading(false);
  }
  /*useEffect(() => {
    loadTransactions();
  }, [transactions])*/

  useFocusEffect(useCallback(()=> {
    //AsyncStorage.removeItem("@gofinances:transactions");
    console.log(highlightData);
    loadTransactions();

  },[]))
  return(
    <Container>
     
      {isLoading ?  
      <LoadContainer>
        <ActivityIndicator color={theme.colors.primary} size="large"/> 
      </LoadContainer> :
        <>
      <Header>
        <UserWrapper>
        <UserInfo>
        <Photo source={{uri: 'https://avatars.githubusercontent.com/u/9766823?v=4'}}/>
          <User>
            <UserGreeting>Olá</UserGreeting>
            <UserName>João</UserName>
          </User>
        </UserInfo>
        <LogOutButton onPress={() => {}}>
          <Icon name='power'/>
        </LogOutButton>
        </UserWrapper>
      </Header>
      <HighlightCards 
        
      >
        <HighlightCard
          type='up' 
          title='Entradas' 
          amount={highlightData.entries.amount} 
          lastTransaction={highlightData.entries.lastTransactions}/>
        <HighlightCard 
          type='down'
          title='Saída' 
          amount={highlightData.expansive.amount} 
          lastTransaction={highlightData.entries.lastTransactions}/>
        <HighlightCard 
          type='total'
          title='Total' 
          amount= {highlightData.total.amount}
          lastTransaction='01 a 6 de abril'/>
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionList data={transactions}
          renderItem = {({ item }) => <TransactionCard
                                      data = {item}/>}
          keyExtractor = {item => item.id}
        />
        

      </Transactions>
      </>}
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
