import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'

import Currency from '../../Currency'
import moment from '../../../vendors/moment'
import Colors from '../../../styles/Colors'

// import { Container } from './styles';

export default function ListItem({ item, onEntryPress, screen = false, editItemScreenEntry }) {

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
        
        // if (item.paymentMode === 'Dinheiro') {
        //     return 'monetization-on'
        // } else if (item.paymentMode === 'Crédito') {
        //     return 'payment'
        // } else {
        //     return 'call-to-action'
        // }
    }

    const [iconPayment, setIconPayment] = useState(paymentMethodIcon())

    function onEntrySelected() {
        if (screen) {
            onEntryPress(item)
        } else {
            editItemScreenEntry(item)
            //console.log(JSON.stringify(item))
        }
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onEntrySelected}>
            <View style={styles.containerInfos}>
                <View >
                    <View style={styles.containerTitle}>
                        <Text style={styles.txtProduct}>{item.description}</Text>
                        <Text style={styles.txtEntryAt}>{moment(item.entryAt).calendar()}</Text>
                    </View>
                </View>
                <View style={styles.containerPriceQty}>
                    <View style={styles.containerValues}>
                        <Icon name='local-offer' size={20} color={Colors.lightPrimaryColor}></Icon>
                        <Text style={styles.txtPrices}>{item.amount}</Text>
                    </View>
                    <View style={styles.containerValues}>
                        <Text style={{ color: Colors.lightPrimaryColor }}>x </Text>
                        <Text style={styles.txtPrices}>{item.qty}</Text>
                    </View>
                    <View style={styles.containerValues}>
                        <Icon name={iconPayment} size={20} color={Colors.lightPrimaryColor} />
                        <Text style={styles.txtTotal}><Currency value={item.totalAmount}/></Text>
                    </View>
                    <View style={styles.containerValues}>
                        <Icon2 name='sale' size={20} color={Colors.lightPrimaryColor} />
                        <Text style={styles.txtClient}>{item.discount}</Text>
                    </View>
                    <View style={styles.containerValues}>
                        <Icon2 name="cash" size={20} color={Colors.lightPrimaryColor}/>
                        <Text style={styles.txtTotal}><Currency value={item.discountedValue} /></Text>
                    </View>

                </View>
                <View style={styles.containerClient}>
                    <Text style={styles.txtClient}>{item.client}</Text>
                    <Text style={styles.txtClient}>{item.category.name}</Text>
                    <View style={styles.containerValues}>
                        <Icon name='today' size={20} color={Colors.lightPrimaryColor} />
                        <Text style={styles.txtPayAt}>{moment(item.payAt).calendar()}</Text>
                    </View>
                </View>

            </View>
            <View style={[styles.sellerIndicator, {backgroundColor: item.seller.color}]}></View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
    },

    containerInfos: {
        flex: 1,
        paddingHorizontal: 10
    },
    containerTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    txtProduct: {
        fontSize: 20,
        color: Colors.primaryTextColor
    },
    txtEntryAt: {
        fontSize: 18,
        color: Colors.secondaryTextColor,
        fontWeight: 'bold'
    },
    containerPriceQty: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        //paddingTop: 5,
        //paddingLeft: 15
    },
    containerValues: {
        width: 100,
        height: 30,
        flexDirection: 'row',
        //backgroundColor:'red',
        justifyContent: 'center',
        alignItems: 'center',
        //borderRightWidth: 1
    },
    txtPrices: {
        paddingRight: 15,
        fontSize: 18,
        paddingLeft:3,
        color: Colors.secondaryTextColor
    },
    txtTotal: {
        color: Colors.secondaryTextColor,
        fontSize: 18,
        paddingLeft:3,
        fontWeight: 'bold'
        //alignSelf:'center'
    },
    containerClient: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 5,
        paddingLeft: 15
    },
    txtClient: {
        fontSize: 16,
        paddingLeft:3,
        color: Colors.secondaryTextColor,
    },
    txtPayAt:{
        fontSize:14,
        paddingLeft:3,
        color: Colors.secondaryTextColor,
    },
    txtSaller: {},
    buttomDelete: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        backgroundColor: Colors.azulSafraDarker
    },
    sellerIndicator: {
        backgroundColor: Colors.redDark,
        width: 15,
        minHeight: '100%',

    },

})