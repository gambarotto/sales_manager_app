import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal'

import Colors from '../../../styles/Colors'
// import { Container } from './styles';

export default function ModalCategory({ isVisible, setIsVisible, onChangeValue, categories }) {

    function itemSelected(item) {
        onChangeValue(item)
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
                        data={categories}
                        keyExtractor={item => item.id}    
                        renderItem={({item}) => (
                            <TouchableOpacity 
                                style={styles.containerItem}
                                onPress={() => itemSelected(item)}>
                                <Text style={styles.textItem}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        style={{flex:1}}
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
        backgroundColor:Colors.backgroundLight
    },
    containerItem:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        margin:5,
        //backgroundColor:Colors.accentColor,
        borderRadius:4
    },
    textItem:{
        fontSize:22,
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
        color:Colors.white
    }
})