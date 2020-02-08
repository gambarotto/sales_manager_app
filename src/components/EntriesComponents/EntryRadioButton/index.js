import React, { useState, useEffect } from 'react';
import { Animated ,View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import Colors from '../../../styles/Colors'

export default function EntryRadioButton({ 
    title, 
    setRadio, 
    activatedRadio, 
    obj = null }) {

    const [fadeAnimation] = useState(new Animated.Value(0))

    useEffect(() => {

        if(obj){
            if(activatedRadio.name === title){
                Animated.timing(
                    fadeAnimation,
                    {
                        toValue:1,
                        duration:700,
                    }
                ).start()
            }
        }else {
            if(activatedRadio === title){
                Animated.timing(
                    fadeAnimation,
                    {
                        toValue:1,
                        duration:700,
                    }
                ).start()
            }
        }

    },[activatedRadio])

    return (
        <View>
            <TouchableOpacity style={styles.containerButton} 
                onPress={() => obj ? setRadio(obj): setRadio(title)}>
                <View style={styles.radioOut}>
                    {
                       obj 
                       ?  activatedRadio.name === title && <Animated.View style={[styles.radioInner, {opacity:fadeAnimation}]}/> 
                       : activatedRadio === title && <Animated.View style={[styles.radioInner, {opacity:fadeAnimation}]}/>
                    }
                </View>

                <Text style={[
                    styles.text, 
                    activatedRadio === title && {
                        fontWeight:'bold',
                        color:Colors.lightPrimaryColor
                    }
                ]}>
                {title}
                </Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {

    },
    containerButton: {
        width: 120,
        height: 70,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center'
    },
    radioOut: {
        width: 30,
        height: 30,
        borderRadius: 30,
        borderWidth: 2,
        borderColor:Colors.lightPrimaryColor,
        justifyContent:'center',
        alignItems:'center',

    },
    radioInner: {
        width: 20,
        height: 20,
        borderRadius: 30,
        backgroundColor: Colors.lightPrimaryColor
    },
    text:{
        marginLeft:5,
        fontSize:16,
        color:Colors.lightPrimaryColor
    }
})