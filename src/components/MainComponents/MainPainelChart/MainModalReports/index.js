import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal'

import Colors from '../../../../styles/Colors'
// import { Container } from './styles';

export default function MainModalReports({ isVisible, setIsVisible, onChangeValue, data, type }) {

    function itemSelected(item){
        if(item.days){
            onChangeValue(item.days)

        }else{
            onChangeValue(item)
            //console.log('itemSelected ', JSON.stringify(item));
            
        }
        setIsVisible(false)
    }

    return (
        <View>
            <Modal
                style={styles.container}
                isVisible={isVisible}
            >
                <View style={styles.containerInner}>
                
                    <FlatList
                        data={data}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                style={styles.containerButtonItem}
                                onPress={() => itemSelected(item)}>
                                <Text style={styles.txtItem}>
                                    { item.days ? `${item.days} Dias` : `${item.name}` }
                                </Text>
                            </TouchableOpacity>
                        )}
                        style={{ flex: 1 }}
                    />
                    <TouchableOpacity
                        onPress={() => setIsVisible(false)}
                        style={styles.buttonClose}>
                        <Text style={styles.textButtom}>FECHAR</Text>
                    </TouchableOpacity>
                </View>

            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    containerInner:{
        width:300,
        height:570,
        padding:10,
        borderRadius:4,
        alignItems:'stretch',
        backgroundColor:Colors.defaultPrimaryColor
    },
    containerButtonItem:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        margin:5,
        //borderWidth:1,
        //backgroundColor:Colors.accentColor2,
        //borderColor:Colors.darkPrimaryColor,
        borderRadius:4
    },
    txtItem:{
        flex:1,
        padding:10,
        color:'black',
        fontSize:20,
        color:Colors.lightPrimaryColor
    },
    buttonClose:{
        flex:1,
        maxHeight:60,
        marginVertical:10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.accentColor2,
        borderRadius:4
    },
    textButtom:{
        fontWeight:'bold',
        fontSize:20,
        color:Colors.lightPrimaryColor
    }
})