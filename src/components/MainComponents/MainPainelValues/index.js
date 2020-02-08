import React from 'react';
import { View, Text, TouchableOpacity ,StyleSheet } from 'react-native';

import useBalance from '../../../hooks/useBalance'

import MainValuesItems from './MainValuesItems'
import ContainerTitle from '../../Core/ContainerTitle'

import Colors from '../../../styles/Colors'
// import { Container } from './styles';

export default function MainPainelValues({title,days, handleChangePeriod}) {

    const [balance,balanceLiq,balance35,balanceDiscountedValue ] = useBalance(days)

    return (
        <View style={styles.containerAmount}>
            <ContainerTitle
                colorOne={Colors.defaultPrimaryColor}
                colorTwo={Colors.defaultPrimaryColor}>
                <TouchableOpacity onPress={handleChangePeriod}>
                    <Text style={styles.title}>{title}</Text>
                </TouchableOpacity>
            </ContainerTitle>
            <View style={styles.containerSales}>
               <MainValuesItems 
                    title="Venda Bruta"
                    value={balance}
               />
               <MainValuesItems 
                    title="Vendas Com Desconto"
                    value={balanceDiscountedValue}
               />
               <MainValuesItems 
                    title="Liquido"
                    value={balanceLiq}
               />
               <MainValuesItems
                    title="Entregando na data"
                    value={balance35}
               />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    containerAmount: {
        flex: 1,
    },
    containerSales: {
        flex: 1,
        //flexDirection: 'row'
    },
    title: {
        fontSize: 20,
        color: Colors.lightPrimaryColor,
        alignSelf: 'center'
      },
})
