import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Currency from '../../../../Currency'
import Colors from '../../../../../styles/Colors'

// import { Container } from './styles';

export default function LegendItemListSellers({ item }) {

    //console.log(JSON.stringify(item))
    return (
        <View style={styles.container}>
            <View style={[styles.indicator,{backgroundColor:item.seller.color}]}></View>
            <View style={styles.containerItem}>
                <Text style={styles.txtSeller}>{item.seller.name}</Text>
            </View>
            <View style={styles.containerItem}>
                <Text style={styles.txtBruto}>
                    <Currency value={item.totalAmount}/>
                </Text>
            </View>
            <View style={styles.containerItem}>
                
                <Text style={styles.txtLiq}>
                    <Currency value={item.discountedValue}/> 
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop:5,
        paddingHorizontal:5,
        
    },
    indicator:{
        width:16,
        height:16,
        borderRadius:15,
        borderWidth:0.5,
        borderColor:Colors.defaultPrimaryColor,
        //backgroundColor:'red',
    },
    containerItem: {
        width: 110,
        paddingHorizontal:10
        //backgroundColor: 'red'
    },
    txtSeller: {
        color: Colors.lightPrimaryColor,
        fontWeight: 'bold',
        fontSize: 18,
        paddingLeft: 5
    },
    txtBruto: {
        fontSize: 18,
        paddingLeft: 5,
        fontWeight:'bold',
        color: Colors.lightPrimaryColor,

    },
    txtLiq: {
        fontSize:18,
        paddingLeft: 5,
        fontWeight:'bold',
        color: Colors.lightPrimaryColor,

    }
})