import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Text, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import usePeriod from '../../hooks/usePeriod'
import moment from '../../vendors/moment'
import Colors from '../../styles/Colors'

export default function Loading({ navigation }) {

    const [getCurrentPeriod,savePeriod] = usePeriod()

    useEffect(() => {
        async function verifyPeriod() {

            //await AsyncStorage.clear()
            // const obj = {
                // id: '123',
                // initialDate: new Date(),
                // finalDate: '2020-02-09T19:03:37.623Z',
            // }

            // savePeriod(obj)
            // await AsyncStorage.setItem('currentPeriod', JSON.stringify(obj))

            try {
                let currentDate = new Date()
                const period = await getCurrentPeriod()
                console.log('period', JSON.stringify(period))
                let modal = {
                    modal:true,
                    id:null,
                    initialDate:null,
                    finalDate:null,
                }
                if (period && period.id) {

                    currentDate = moment(currentDate).format('DD/MM/YY')
                    const initialDate = moment(period.initialDate).format('DD/MM/YY')
                    const finalDate = moment(period.finalDate).format('DD/MM/YY')

                    if (currentDate >= initialDate && currentDate <= finalDate) {
                        modal = {
                            modal:false,
                            id:period.id,
                            initialDate: period.initialDate,
                            finalDate: period.finalDate
                        }

                        navigation.navigate('Main',{ modal })
                        console.log('entrou no periodo', currentDate)
                    } else {
                        console.log('nao entrou no periodo 1 ')

                        navigation.navigate('Main', { modal })
                    }
                } else {
                    console.log('nao entrou no periodo 2')

                    navigation.navigate('Main', { modal })
                }

            } catch (error) {

            }
        }
        setTimeout(() => verifyPeriod(),1000)
        

    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.containerImage}>
                <ImageBackground style={styles.img} source={require('../../assets/images/finances-logo-ok.png')}>
                
                    {/*<Text style={styles.txt}>Controle de Vendas</Text>*/}
                </ImageBackground>
            </View>
    {<ActivityIndicator color={Colors.accentColor2} size={40}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.defaultPrimaryColor
    },
    containerImage:{
        width:450,
        height:450,
        
//        backgroundColor:Colors.lightPrimaryColor
    },
    img:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    txt:{
        color:Colors.lightPrimaryColor,
        fontSize:46,
        marginBottom:50
    }
})