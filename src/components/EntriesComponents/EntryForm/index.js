import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

import getUUID from '../../../services/UUID'

import InputForm from '../../Core/InputForm'
import InputMoney from '../../Core/InputMoney'
import EntryCategoryPicker from '../EntryCategoryPicker'
import EntryRadioButton from '../EntryRadioButton'
import EntryDatePicker from '../EntryDatePicker'
import ActionFooter, { ActionPrimaryButton } from '../../Core/ActionFooter'
import Colors from '../../../styles/Colors';
import moment from '../../../vendors/moment';

export default function EntryForm({
    flex = 1,
    entrySelected,
    modifyList,
    entryList,
    sellers,
    clearAllInputs,
    setClearAllInputs,
    
}) {

    const [id, setId] = useState(entrySelected.id)
    const [idEntry, setIdEntry] = useState(entrySelected.idEntry)

    const [product, setProduct] = useState(entrySelected.description)
    const [qty, setQty] = useState(String(entrySelected.qty))
    const [amount, setAmount] = useState(entrySelected.amount)
    const [discount, setDiscount] = useState(String(entrySelected.discount))
    //const [discountedValue,setDiscountedValue] = useState()
    const [paymentMode, setPaymentMode] = useState(entrySelected.paymentMode)
    const [dateSellPickerData, setDateSellPickerData] = useState(entrySelected.entryAt)
    const [datePaymentPickerData, setDatePaymentPickerData] = useState(entrySelected.payAt)
    const [client, setClient] = useState(entrySelected.client)
    const [seller, setSeller] = useState(entrySelected.seller)
    const [category, setCategory] = useState(entrySelected.category)

    const [modalCategoryVisible, setModalCategoryVisible] = useState(false)

    const [dateSellPickerVisible, setDateSellPickerVisible] = useState(false)
    const [datePaymentPickerVisible, setDatePaymentPickerVisible] = useState(false)

    const [disableDateButton, setDisableDateButton] = useState(false)

    function setAll() {
        setId(entrySelected.id)
        setIdEntry(entrySelected.idEntry)
        setProduct(entrySelected.description)
        setQty(entrySelected.qty)
        setAmount(entrySelected.amount)
        setDiscount(entrySelected.discount)
        setCategory(entrySelected.category)
        setClient(entrySelected.client)
        setSeller(entrySelected.seller)
        setPaymentMode(entrySelected.paymentMode)
        setDatePaymentPickerData(entrySelected.datePaymentPickerData)
        setDateSellPickerData(entrySelected.dateSellPickerData)
    }

    useEffect(() => {
        //console.log(JSON.stringify(entrySelected))
        setAll()
    }, [entrySelected])

    useEffect(() => {
        if (clearAllInputs) {
            clearAll()
            setClearAllInputs(false)
        }
    }, [clearAllInputs])

    useEffect(() => {
        if (paymentMode === 'Débito' || paymentMode === 'Crédito') {
            setDisableDateButton(true)
        } else {
            setDisableDateButton(false)
        }
    }, [paymentMode])

    function verifyIdEntry(){
        if(entryList.length > 0){
            //console.log('verify 1');
            
            if(entryList[0].idEntry){
              //  console.log('verify 2');

                return true
            }else {
                //console.log('verify 3');

                return false
            }
        }else {
            //console.log('verify 4');

            return false
        }
    }

    function validationFilter() {

        if (product || qty || amount || category || seller || client || paymentMode) {
            return false
        } else {
            return true
        }
    }

    function clearAll() {
        setId('')
        setProduct('')
        setQty('')
        setAmount('')
        setDiscount('')
        setCategory({ id: '1', name: 'Categorias' })
        setClient('')
        setSeller({ id: getUUID(), name: 'Vendedor' })
        setPaymentMode('')
        setDatePaymentPickerData(new Date())
        setDateSellPickerData(new Date())
    }

    function validationPayAt(date) {

        if (paymentMode !== 'Dinheiro') {
            return date
        } else {
            return !datePaymentPickerData ? date : datePaymentPickerData
        }
    }

    function dataModelate(){
        const totalAmount = parseFloat(amount) * parseInt(qty)
        const totalDiscLiq = totalAmount * (discount / 100)
        const descReal = 30 - discount
        const discountedValue = (totalAmount - totalDiscLiq) * (descReal/100)
        const date = dateSellPickerData ? dateSellPickerData : new Date()

        const value = {
            id: id || getUUID(),
            idEntry:id,
            description: product,
            qty: qty,
            amount: amount,
            discount: discount || 0,
            totalAmount: totalAmount,
            discountedValue:totalAmount - totalDiscLiq,
            totalAmountLiq: discountedValue,
            paymentMode: paymentMode,
            entryAt: dateSellPickerData || new Date(),
            payAt: validationPayAt(date),
            client: client,
            seller: seller,
            category: category
        }
        return value
    }

    function dellItem(){
        const arr = [...entryList]
        const newArr = arr.filter(item => {
            return item.id !== id
        })
        modifyList([...newArr])
        clearAll()
    }

    function addToList() {

        const value = dataModelate()

        const arr = [...entryList]
        const newArr = arr.filter(item => {
            return item.id !== value.id
        })

        modifyList([...newArr, value])
        clearAll()
    }

    return (
        <View style={[styles.container, { flex: flex }]}>
            <ScrollView style={{ flex: 1, minHeight: '100%' }}>
                <View style={styles.containerProdQty}>
                    <InputForm onChangeText={setProduct} value={product} width={300} placeholder='Produto' />
                    <InputForm onChangeText={setQty} value={String(qty)} width={100} placeholder='Qtd.' />
                </View>
                <View style={styles.containerAmountDiscount}>
                    <InputMoney 
                        onChangeValue={setAmount}
                        value={amount}
                        width={250} />
                    <InputForm
                        onChangeText={setDiscount}
                        value={String(discount)}
                        width={150}
                        placeholder='Desc' />
                </View>
                <View style={styles.containerPicker}>
                    <Text style={styles.labelVendedor}>Vendedor</Text>

                    <View style={styles.containerRadioSellers}>
                        {
                            sellers.map(sel => (
                                <EntryRadioButton
                                    key={sel.id}
                                    title={sel.name}
                                    activatedRadio={seller}
                                    setRadio={setSeller}
                                    obj={sel}
                                />
                            ))
                        }

                    </View>
                    {/*<Text>{JSON.stringify(qty)}</Text>*/}
                    <EntryCategoryPicker
                        isVisible={modalCategoryVisible}
                        setIsVisible={setModalCategoryVisible}
                        onChangeValue={setCategory}
                        currentValue={category} />
                    <InputForm onChangeText={setClient} value={client} width={410} placeholder='Cliente' />
                </View>

                <View style={styles.containerRadioButtons}>

                    <EntryRadioButton
                        title='Dinheiro'
                        setRadio={setPaymentMode}
                        activatedRadio={paymentMode}
                    />
                    <EntryRadioButton
                        title='Débito'
                        setRadio={setPaymentMode}
                        activatedRadio={paymentMode}
                    />
                    <EntryRadioButton
                        title='Crédito'
                        setRadio={setPaymentMode}
                        activatedRadio={paymentMode}
                    />

                </View>

                <View style={styles.containerActionsButton}>
                    <EntryDatePicker
                        isVisible={dateSellPickerVisible}
                        setIsVisible={setDateSellPickerVisible}
                        setDatePickerData={setDateSellPickerData}
                        title='Venda'
                    />
                    <EntryDatePicker
                        isVisible={datePaymentPickerVisible}
                        setIsVisible={setDatePaymentPickerVisible}
                        setDatePickerData={setDatePaymentPickerData}
                        title='Pagamento'
                        disabled={disableDateButton}
                    />
                </View>
                
                { verifyIdEntry() ? (
                    <ActionFooter>
                    {
                        id ? (
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={dellItem}>
                                <Icon name="delete" size={25} color={Colors.lightPrimaryColor} />
                            </TouchableOpacity>
                        ): null
                    }
                    <ActionPrimaryButton
                        onPress={() => {}}
                        title='ADICIONAR' />
                </ActionFooter>
                ) : (
                    <ActionFooter>
                    {
                        id ? (
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={dellItem}>
                                <Icon name="delete" size={25} color={Colors.lightPrimaryColor} />
                            </TouchableOpacity>
                        ): null
                    }
                    <ActionPrimaryButton
                        onPress={validationFilter && addToList}
                        title='ADICIONAR' />
                </ActionFooter>
                ) }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    containerProdQty: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    containerAmountDiscount: {
        flexDirection: 'row'
    },
    containerPicker: {},
    labelVendedor: {
        paddingLeft: 20,
        paddingTop: 10,
        color: Colors.secondaryTextColor
    },
    containerRadioSellers: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
    },
    containerRadioButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    containerActionsButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 50
    },
    deleteButton: {
        width: 60,
        height: 60,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        //borderRadius: 30,
        backgroundColor: Colors.accentColor2,
        justifyContent: 'center',
        alignItems: 'center',
    },
})