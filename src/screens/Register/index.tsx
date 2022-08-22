import React, {useState} from "react";
import { Button } from "../../components/Form/Button/style";
import { Input } from "../../components/Form/Input";
import { TransactionTypeButton,  } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";

import { CategorySelect } from "../CategorySelect";

import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";

import { Container,
          Header,
          Title,
          Form,
          Fields,
          TransactionTypes, } from "./style";
import { InputForm } from "../../components/Form/InputForm";
import { useForm } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

export function Register(){

  const schema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    amount: yup.number()
    .typeError("Informe somente números")
    .required("Valor é obrigatório")
    .positive("O valor não pode ser negativo")
  })
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  const [transactionType, setTransactionType] = useState(''); 
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(schema)
  })

  function handleTransactionTypeSelect(type: 'up' | 'down'){
    setTransactionType(type)
  }
  function handleCloseSelectCategoryModal(){
    setCategoryModalOpen(false);
  }

  function handleOpenSelectCategoryModal(){
    setCategoryModalOpen(true);
  }

  function handleRegister(form: FormData){
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    if(!transactionType)
      return Alert.alert("Selecione o tipo da transação")
    
    if(category.key === "category")
      return Alert.alert("Selecione a categoria")

    
    console.log(data)
  }

  interface FormData{
    name: string;
    amount: string;
    
  }

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
    <Container>
          
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <InputForm 
          placeholder="Nome" 
          control={control} 
          name="name"
          autoCapitalize="characters"
          autoCorrect={false}
          error={errors.name && errors.name.message}
          />
          <InputForm placeholder="Preço" control={control} name="amount"
          keyboardType="numeric"
          error={errors.amount && errors.amount.message}
          />
              <TransactionTypes>
              <TransactionTypeButton 
                type="up"
                title ="Income"
                onPress={() => handleTransactionTypeSelect('up')}
                isActive = {transactionType === 'up'}
                
              />

              <TransactionTypeButton 
                type="down"
                title ="Outcome"
                onPress={() => handleTransactionTypeSelect('down')}
                isActive = {transactionType === 'down'}
              />
          </TransactionTypes>
          <CategorySelectButton title={category.name}
          onPress={handleOpenSelectCategoryModal}
          />
        </Fields>
       
        <Button title="Enviar" onPress={handleSubmit(handleRegister)}/>
      </Form>
      
      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category = {category}
          setCategory = {setCategory}
          closeSelectCategory = {handleCloseSelectCategoryModal}/>
      </Modal>
     
    </Container>
    </TouchableWithoutFeedback>

  );
}

