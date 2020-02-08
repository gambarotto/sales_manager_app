import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
// import { Container } from './styles';
import Colors from '../../../styles/Colors'

export default function InputMoney({value, onChangeValue, width = 200}) {
    return (
        <TextInputMask
            style={[styles.container, {width:width}]}
            type={'money'}
            options={{
                precision: 2,
                separator: ',',
                delimiter: '.',
                unit: '',
                suffixUnit: ''
            }}
            placeholder='Valor'
            placeholderTextColor={Colors.secondaryTextColor}
            includeRawValueInChangeText={true}
            onChangeText={(maskedValue, rawValue) => onChangeValue(rawValue)}
            value={value} />
  );
}

const styles = StyleSheet.create({
    container: {
        minHeight:70,
        backgroundColor:Colors.backgroundLight,
        borderRadius:4,
        paddingHorizontal:15,
        margin:3,
        fontSize:18,
        color:Colors.lightPrimaryColor
    },
})