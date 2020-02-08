import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Platform, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Modal from 'react-native-modal'

import moment from '../../../vendors/moment'
import getUUID from '../../../services/UUID'
import usePeriod from '../../../hooks/usePeriod'
import Colors from '../../../styles/Colors'

export default function ModalPeriod({
    isVisiblePeriod,
    setIsVisiblePeriod,
    id,
    initial,
    setInitial,
    final,
    setFinal,
    setPeriodAltered
}) {

    const [,savePeriod] = usePeriod()

    const [initialIsVisible, setInitialIsVisible] = useState(false)
    const [finalIsVisible, setFinalIsVisible] = useState(false)

    const [idPeriod, setIdPeriod] = useState(id)
    const [initialData, setInitialData] = useState(initial)
    const [finalData, setFinalData] = useState(final)
    const [altered, setAltered] = useState(false)

    function handleConfirmInitial(event, selectedDate) {
        
        if(event.type === 'dismissed'){
            setInitialIsVisible(false)
        }
        setInitialIsVisible(Platform.OS === 'ios' ? true : false)
        const currentDate = selectedDate || new Date()
        setInitialData(currentDate)
        
        
    }
    function handleConfirmFinal(event, selectedDate) {
        
        if(event.type === 'dismissed'){
            setInitialIsVisible(false)
        }
        setFinalIsVisible(Platform.OS === 'ios' ? true : false)
        const currentDate = selectedDate || new Date()
        setFinalData(currentDate)
        
        
    }

    async function handleConfirm() {

        if (initialData && finalData) {
            setInitial(initialData)
            setFinal(finalData)
            const period = {
                id:idPeriod || getUUID(),
                initialDate:initialData,
                finalDate:finalData
            }
            await savePeriod(period)

            setPeriodAltered(true)
            setIsVisiblePeriod(false)
        }
    }

    return (
        <View>
            <Modal
                style={styles.container}
                isVisible={isVisiblePeriod}
                hasBackdrop={true}
                onBackButtonPress={() => { setIsVisiblePeriod(false)}}
                >
                <View style={styles.containerInner}>
                    <View style={styles.containerImage}>
                        <Image
                            style={styles.img}
                            source={require('../../../assets/images/image-period.png')} />
                    </View>
                    <View style={styles.containerBloco}>
                        <Text style={styles.txtInfo}>Selecione o inicio do Período</Text>
                        <View
                            style={styles.containerBtnDate}>
                            <Icon name="today" size={25} color={Colors.lightPrimaryColor} />
                            <TouchableOpacity
                                style={styles.dateBtn}
                                onPress={() => setInitialIsVisible(true)}>
                                <Text style={styles.txtBtn}>
                                    {initialData && moment(initialData).format('DD/MM/YYYY')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {
                            initialIsVisible && (
                                <DateTimePicker
                                    isVisible={initialIsVisible}
                                    mode='date'
                                    value={new Date()}
                                    onChange={handleConfirmInitial}
                                />
                            )
                        }
                    </View>
                    <View style={styles.containerBloco}>
                        <Text style={styles.txtInfo}>Selecione o fim do Período</Text>
                        <View style={styles.containerBtnDate}>
                            <Icon name="today" size={25} color={Colors.lightPrimaryColor} />
                            <TouchableOpacity
                                style={styles.dateBtn}
                                onPress={() => setFinalIsVisible(true)}>
                                <Text style={styles.txtBtn}>
                                    {finalData && moment(finalData).format('DD/MM/YYYY')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {
                            finalIsVisible && (
                                <DateTimePicker
                                    isVisible={finalIsVisible}
                                    mode='date'
                                    value={new Date()}
                                    onChange={handleConfirmFinal}

                                />
                            )
                        }
                    </View>
                    <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={handleConfirm}>
                        <Text style={styles.txtCloseBtn}>OK</Text>
                    </TouchableOpacity>

                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        width: 400,
        height: 500,
        backgroundColor: Colors.defaultPrimaryColor,
        padding: 20
    },
    containerInner: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    containerImage: {
        height: 200,
        width: 200,
        marginBottom: 60
    },
    img: {
        height: '100%',
        width: '100%'
    },
    containerBloco: {
        alignSelf: 'auto',
        marginBottom: 20
    },
    txtInfo: {
        color: Colors.lightPrimaryColor,
        marginBottom: 10
    },
    containerBtnDate: {
        flexDirection: 'row',
        backgroundColor: Colors.backgroundLight,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    dateBtn: {
        height: 60,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.backgroundLight
    },
    txtBtn: {
        fontSize: 20,
        color: Colors.lightPrimaryColor,
        fontWeight: 'bold'
    },
    closeBtn: {
        height: 60,
        width: 350,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.accentColor2,
        marginTop: 20
    },
    txtCloseBtn: {
        color: Colors.lightPrimaryColor,
        fontSize: 22,
        fontWeight: 'bold'
    },
})