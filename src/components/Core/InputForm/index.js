import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import Colors from '../../../styles/Colors'
// import { Container } from './styles';

export default function InputForm({value, onChangeText, placeholder , width = 200}) {
  return (
        <TextInput
            style={[styles.container, {width:width}]} 
            onChangeText={(text) => onChangeText(text)}
            value={value}
            autoCapitalize='words'
            autoCorrect={false}
            placeholder={placeholder}
            placeholderTextColor={Colors.secondaryTextColor}
        />
  );
}

const styles = StyleSheet.create({
    container: {
        //flex:1,
        minHeight:70,
        backgroundColor:Colors.backgroundLight,
        borderRadius:4,
        paddingHorizontal:15,
        margin:3,
        fontSize:18,
        color:Colors.lightPrimaryColor

    },
})