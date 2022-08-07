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
  Icon

} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';

export function Dashboard(){
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
