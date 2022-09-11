import React, { useState } from "react";
import { HistoryCard } from "../../components/HistoryCard";
import { useEffect, useCallback} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Container, 
          Header, 
          Title, 
          Content, 
          ChartContainer,
          MonthSelect,
          MonthSelectButton,
          MonthSelectIcon,
          Month,
          LoadContainer
        } from "./style";
import { categories } from "../../utils/categories";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs"
import {addMonths, subMonths, format} from "date-fns"
import {ptBR} from "date-fns/locale"
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

 export interface TransactionData {
  data:{
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
  }
}
  
export interface CategoryData{
  key: string,
  name:string,
  total: number,
  totalFormatted: string,
  color: string,
  percent: string,
}
  

export function Resume(){
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();

  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

  function handleDateChange(action: "next" | "prev"){
    if(action === "next"){
        const newDate = addMonths(selectedDate, 1) 
        setSelectedDate(newDate)
    }else{
      const newDate = subMonths(selectedDate, 1) 
      setSelectedDate(newDate)
    }
  }
  async function loadData() {
    try{
      setIsLoading(true);
      const datakey = "@gofinances:transactions"
      const response = await AsyncStorage.getItem(datakey)
      const responseFormated = response ? JSON.parse(response) : []
      

      const totalByCategory: CategoryData[] = [];
      
      const expensives = responseFormated.filter((expensive: TransactionData) => 
      expensive.data.type === 'negative' &&
      new Date(expensive.data.date).getMonth() == selectedDate.getMonth() &&
      new Date(expensive.data.date).getFullYear() == selectedDate.getFullYear()
      )

      const expensivesTotal = expensives.reduce((acumulator:number, expensive:TransactioData) => {
        return acumulator + Number(expensive.amount)
      },0)

      console.log("˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜")
      console.log(expensives)
      console.log("˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜")

      categories.forEach(category => {
        let categorySum = 0;

        expensives.forEach((expensive: TransactionData) =>{
          
          if(expensive.data.category == category.key){
            categorySum += Number(expensive.data.amount)
          }
        })
        if(categorySum > 0){
          const total = categorySum
          .toLocaleString('pt-BR',{
            style: 'currency', 
            currency: 'BRL'
          })

          const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted: total,
          percent
        })
      }
      })

      //console.log(totalByCategory)
      setTotalByCategories(totalByCategory)
    }catch(ex){

    }
    setIsLoading(false)
  }
/*
  useEffect(()=>{
    loadData()
  },[selectedDate])*/

  useFocusEffect(useCallback(()=> {
    //AsyncStorage.removeItem("@gofinances:transactions");
    
    loadData();

  },[selectedDate]))

  return(
    <Container>
      
      <Header>
        <Title>Resumo por Categoria</Title>
      </Header>
      {isLoading ?  
      <LoadContainer>
        <ActivityIndicator color={theme.colors.primary} size="large"/> 
      </LoadContainer> :
      
      <Content 
      showsVerticallScrollIndicator = {false}
      contentContainerStyle =  {{
        flex:1 , 
        paddingBottom: useBottomTabBarHeight(),
      }}
       >
      <ChartContainer>
        <MonthSelect>
          <MonthSelectButton onPress= {()=> handleDateChange("prev")}>
              <MonthSelectIcon name="chevron-left"/>
          </MonthSelectButton>
            <Month>{format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</Month>
          <MonthSelectButton onPress={() => handleDateChange("next")}>
              <MonthSelectIcon name="chevron-right"/>
          </MonthSelectButton>
        </MonthSelect>
        <VictoryPie
          data={totalByCategories}
          x="percent"
          y="total"
          colorScale={totalByCategories.map(category => category.color)}
          style={{
            labels:{
              fontSize: RFValue(18),
              fontWeight: 'bold',
              fill: theme.colors.shape
            }
          }}
          labelRadius={50}
        />  
      </ChartContainer>
    {
      totalByCategories.map(item => (

      
      <HistoryCard
      key={item.key}
      title={item.name}
      amount={item.totalFormatted}
      color={item.color}

      />

      ))
    }
    </Content>
    
  }
    </Container>
  
  )
}