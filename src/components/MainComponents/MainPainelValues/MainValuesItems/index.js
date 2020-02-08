import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Currency from '../../../Currency'

import Colors from '../../../../styles/Colors'
// import { Container } from './styles';

export default function MainValuesItems({ title, value }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.containerValue}>
                <Text style={styles.value}><Currency value={value} /></Text>

            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        height:50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingLeft: 35,
        backgroundColor:Colors.backgroundLight,
        borderRadius: 50,
        marginHorizontal: 20,
        marginVertical: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        letterSpacing: 2,
        fontWeight: 'bold',
        color: Colors.lightPrimaryColor
    },
    containerValue:{
        width:200,
        borderRadius: 30,
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:Colors.accentColor2,
        marginRight:2
    },
    value: {
        fontSize: 18,
        letterSpacing: 2,
        fontWeight: 'bold',
        color: Colors.lightPrimaryColor,
        padding:8

    },
})