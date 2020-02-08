import React, { useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

import LabelSales from '../../LabelSales'
import ActionFooter, { ActionPrimaryButton } from '../../Core/ActionFooter'
import Colors from '../../../styles/Colors'

export default function EntryValues({
    navigation,
    flex = 1,
    entries,
    valorBruto,
    valorLiquido,
    discountedValue,
    valorTrintaECinco,
    setValorBruto,
    setValorLiquido,
    setDiscountedValue,
    setValorTrintaECinco,
    finalizeSale,
    deleteEntriesFunc,
}) {

    function calcValues() {
        //valor = 100
        //desconto = 10%
        let total = 0
        let valLiquido = 0
        let valorComDesconto = 0

        entries.map(entry => {
            const valDisc = (parseFloat(entry.totalAmount) * parseFloat(entry.discount)) / 100
            //10 - desconto de 10%

            total = total + parseFloat(entry.totalAmount)
            valorComDesconto = valorComDesconto + (parseFloat(entry.totalAmount) - valDisc)

            const percentDisc = 30 - parseFloat(entry.discount) //20%
            valLiquido =
                valLiquido + (parseFloat(entry.totalAmount) * (percentDisc / 100))
        })

        setValorBruto(total)
        setValorLiquido(valLiquido)
        setDiscountedValue(valorComDesconto)
    }

    useEffect(() => {
        calcValues()
    }, [entries])

    useEffect(() => {

        setValorTrintaECinco(valorLiquido + (valorLiquido * 0.05))
    }, [valorLiquido])

    return (
        <View style={[styles.container, { flex: flex }]}>
            <ScrollView style={{ flex: 1, }}>
                <View style={styles.containerValues}>
                    <LabelSales
                        value={valorBruto}
                        title={'Valor'}
                        colorOne={Colors.accentColor2}
                        colorTwo={Colors.accentColor2}
                        colorLabel={Colors.white}
                    />
                    <LabelSales
                        value={discountedValue}
                        title={'Valor com Desc.'}
                        colorOne={Colors.accentColor2}
                        colorTwo={Colors.accentColor2}
                        colorLabel={Colors.white}
                    />
                    <LabelSales
                        value={valorLiquido}
                        title={'Liquido'}
                        colorOne={Colors.accentColor2}
                        colorTwo={Colors.accentColor2}
                        colorLabel={Colors.white}
                    />
                    <LabelSales
                        value={valorTrintaECinco}
                        title={'35%'}
                        colorOne={Colors.accentColor2}
                        colorTwo={Colors.accentColor2}
                        colorLabel={Colors.white}
                    />
                </View>

                <ActionFooter>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={deleteEntriesFunc}>
                        <Icon name="delete" size={25} color={Colors.lightPrimaryColor} />
                    </TouchableOpacity>
                    <ActionPrimaryButton title='Finalizar' onPress={finalizeSale} />
                </ActionFooter>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        justifyContent: 'space-evenly'
    },
    containerValues: {
        flex: 1,
        justifyContent:'space-between',
        marginBottom: 120
    },
    deleteButton: {
        width: 60,
        height: 60,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        backgroundColor: Colors.accentColor2,
        justifyContent: 'center',
        alignItems: 'center',
    },
})