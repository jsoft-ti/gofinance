import React, {useState, useEffect} from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import  uuid  from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";

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
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  })

  const datakey = "@gofinances:transactions"
  const navigation = useNavigation();

  function handleTransactionTypeSelect(type: 'positive' | 'negative'){
    setTransactionType(type)
  }
  function handleCloseSelectCategoryModal(){
    setCategoryModalOpen(false);
  }

  function handleOpenSelectCategoryModal(){
    setCategoryModalOpen(true);
  }

  async function handleRegister(form: FormData){
    const newTransaction = {
      id: String(uuid.v4()),
      data:{
        name: form.name,
        amount: form.amount,
        type: transactionType,
        category: category.key,
        date: new Date()
      }
    }

    if(!transactionType)
      return Alert.alert("Selecione o tipo da transação")
    
    if(category.key === "category")
      return Alert.alert("Selecione a categoria")

    
      try{
        const data = await AsyncStorage.getItem(datakey)
        const currentData = data ? JSON.parse(data) : []
        const dataFormatted = [
          ...currentData,
          newTransaction
        ]
        await AsyncStorage.setItem(datakey, JSON.stringify(dataFormatted))
        console.log(dataFormatted)
      }catch (error){
        console.log(error)
        Alert.alert("Não foi possível salvar.")
      }
    
      setTransactionType('')
      setCategory({
        key: 'category',
        name: 'Categoria',
      })
      reset();
      navigation.navigate("Listagem")
  }

  interface FormData{
    name: string;
    amount: string;
    
  }

  useEffect(() => {
    async function loadData(){
       const data = await AsyncStorage.getItem(datakey)
       console.log(JSON.parse(data!))
    }

    /*//loadData()
    async function removeAll(){
      await AsyncStorage.removeItem(datakey)
      console.log("Removido")
    }

    removeAll();*/

  },[])
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
                onPress={() => handleTransactionTypeSelect('positive')}
                isActive = {transactionType === 'positive'}
                
              />

              <TransactionTypeButton 
                type="down"
                title ="Outcome"
                onPress={() => handleTransactionTypeSelect('negative')}
                isActive = {transactionType === 'negative'}
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

