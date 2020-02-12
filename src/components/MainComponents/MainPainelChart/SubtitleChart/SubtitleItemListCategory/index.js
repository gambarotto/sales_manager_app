import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Currency from '../../../../Currency'
import Colors from '../../../../../styles/Colors'


// import { Container } from './styles';

export default function SubtitleItemListCategory({ item }) {
    return (
        <View style={styles.container}>
            <View style={[styles.indicator, { backgroundColor: item.category.color }]}></View>
            <View style={styles.containerItem}>
                <Text style={styles.txtCategory}>{item.category.name}</Text>
            </View>
            <View style={styles.containerItem}>
                <Text style={styles.txtBruto}>
                    <Currency value={item.totalAmount} />
                </Text>
            </View>
            <View style={styles.containerItem}>
                <Text style={styles.txtBruto}>
                    {item.qty}
                </Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor:'blue',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 5,
        paddingHorizontal: 5,
        marginLeft: 5
    },
    indicator: {
        width: 16,
        height: 16,
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: Colors.defaultPrimaryColor,
        //backgroundColor:'red',
    },
    containerItem: {
        width: 110,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'red'
    },
    txtCategory: {
        color: Colors.lightPrimaryColor,
        fontWeight: 'bold',
        fontSize: 18,
        paddingLeft: 5
    },
    txtBruto: {
        color: Colors.lightPrimaryColor,
        fontSize: 18,
        paddingLeft: 5,
        fontWeight: 'bold'
    },
})