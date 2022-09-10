import React from "react";
import { categories } from "../../utils/categories";

import { Container,
          Title,
          Amount,
          Footer,
          Category,
          Icon,
          CategoryName,
          Date,
} from "./style";

interface Category{
  name: string;
  icon: string;
}
export interface TransactionCardProps{
  data: {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
  }
  

}
export function TransactionCard({data}){
  const category = categories.filter(
      item => item.key === data.data.category
  )[0];

  return(
    <Container>
      <Title>{data.data.name}</Title>
      <Amount type={data.data.type}>
        {data.data.type == 'negative' && '- '} {data.data.amount}</Amount>
      <Footer>
        <Category>
          <Icon name={category.icon}></Icon>
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{data.data.date}</Date>
      </Footer>
    </Container>

  );
}