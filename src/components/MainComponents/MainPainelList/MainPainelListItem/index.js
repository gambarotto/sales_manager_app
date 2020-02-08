import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'

import Currency from '../../../Currency'
import moment from '../../../../vendors/moment'
import Colors from '../../../../styles/Colors'

// import { Container } from './styles';

export default function MainPainelListItem({ item, onEntryPress }) {

    function paymentMethodIcon() {

        switch (item.paymentMode) {
            case 'Dinheiro':
                return 'monetization-on'
                break;
            case 'Crédito':
                return 'payment'
                break;
            case 'Débito':
                return 'call-to-action'
                break;
            default:
                return 'call-to-action'
        }
    }
    const [iconPayment, setIconPayment] = useState(paymentMethodIcon())

    function onEntryPressItem(){
        onEntryPress(item)
    }

    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={onEntryPressItem}>
            <View style={styles.containerTitle}>
                <Text style={styles.txtTitle}>{item.client}</Text>
                <Text style={styles.txtTitleEntryAt}>{moment(item.entryAt).format('DD/MM/YY')}</Text>
            </View>
            <View style={styles.containerDescription}>
                <View style={[styles.containerValues,styles.containerValuesDescription]}>
                    <Icon name='shopping-cart' size={20} color={item.seller.color}></Icon>
                    <Text style={styles.txtPrices}>{item.description}</Text>
                </View>
                <View style={[styles.containerValues,styles.containerValuesPrice]}>
                    <Icon name='local-offer' size={20} color={item.seller.color}></Icon>
                    <Text style={styles.txtPrices}><Currency value={item.amount}/></Text>
                </View>
                <View style={[styles.containerValues,styles.containerValuesQty]}>
                    <Text style={{ color: item.seller.color }}>x </Text>
                    <Text style={styles.txtPrices}>{item.qty}</Text>
                </View>
                <View style={[styles.containerValues,styles.containerValuesTotal]}>
                    <Icon name={iconPayment} size={20} color={item.seller.color} />
                    <Text style={styles.txtTotal}><Currency value={item.totalAmount} /></Text>
                </View>
                <View style={[styles.containerValues,styles.containerValuesDiscount]}>
                    <Icon2 name='sale' size={20} color={item.seller.color} />
                    <Text style={styles.txtPrices}>{item.discount}</Text>
                </View>
                <View style={[styles.containerValues,styles.containerValuesTotalLiq]}>
                    <Icon2 name="cash" size={20} color={item.seller.color} />
                    <Text style={styles.txtTotal}><Currency value={item.discountedValue} /></Text>
                </View>
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding:5,
    },
    containerTitle:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingBottom:5
    },
    txtTitle:{
        fontSize:20,
        color:Colors.lightPrimaryColor

    },
    txtTitleEntryAt:{
        fontSize:18,
        color:Colors.secondaryTextColor

    },
    containerDescription:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    containerValues:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    containerValuesDescription:{
        width:120,
        //backgroundColor:'blue'

    },
    containerValuesPrice:{
        width:100,
        //backgroundColor:'green'

    },
    containerValuesQty:{
        width:40,
        //backgroundColor:'yellow'

    },
    containerValuesTotal:{
        width:100,
        //backgroundColor:'gray'

    },
    containerValuesDiscount:{
        width:40,
        //backgroundColor:'brown'

    },
    containerValuesTotalLiq:{
        width:120,
        //backgroundColor:'red'
    },
    txtPrices:{
        fontSize:16,
        color:Colors.lightPrimaryColor,
        paddingLeft:5
    },
    txtTotal:{
        fontSize:16,
        color:Colors.lightPrimaryColor,
        fontWeight:'bold',
        paddingLeft:5
    },
})