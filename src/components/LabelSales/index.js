import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

import Currency from '../Currency'

import ContainerTitle from '../Core/ContainerTitle'
import Colors from '../../styles/Colors'
// import { Container } from './styles';

export default function LabelSales({ 
    title, 
    value, 
    colorOne = Colors.violet, 
    colorTwo = Colors.blue,
    colorLabel = Colors.champagneDark,
    colorContainerValueOne,
    colorContainerValueTwo,
    direction

}) {
    return (
        <LinearGradient
            style={styles.container}
            colors={[colorOne, colorTwo]}>
            <Text style={[styles.txtTitle, {color: colorLabel}]}>{title}</Text>
            <ContainerTitle
                colorContainerValueOne={colorContainerValueOne && colorContainerValueOne}
                colorContainerValueTwo={colorContainerValueTwo && colorContainerValueTwo}>
                <Text style={styles.txtValue} >
                    <Currency value={value}/>
                </Text>
            </ContainerTitle>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        padding: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: Colors.brancoSafra,
        elevation: 5,
        borderColor: Colors.azulSafraDarker,
        shadowColor: Colors.azulPrincipal
    },
    txtTitle: {
        color: Colors.champagneDark,
        fontSize: 26,
        marginBottom:15
    },
    txtValue: {
        color: Colors.white,
        fontSize: 26,
        paddingHorizontal:20,
        paddingVertical:10
    }
})
