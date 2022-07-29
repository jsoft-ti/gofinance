import { View, Text } from 'react-native'
import React from 'react'

interface Props{
  title: string;
}
export default function Welcome({title}:Props) {
  return (
    <View>
      <Text>A{title}</Text>
    </View>
  )
}