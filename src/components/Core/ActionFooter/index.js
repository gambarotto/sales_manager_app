import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import Colors from '../../../styles/Colors'

export const ActionPrimaryButton = ({title,onPress}) =>{
    return (
        <TouchableOpacity style={styles.ActionPrimaryButtonContainer} onPress={onPress}>
            <Text style={styles.ActionPrimaryButtonTitle}>{title}</Text>
        </TouchableOpacity>
    )
}

export const ActionSecondaryButton = ({title,onPress}) => {
    return (
        <TouchableOpacity style={styles.ActionSecondaryButtonContainer} onPress={onPress}>
            <Text style={styles.ActionSecondaryButtonTitle}>{title}</Text>
        </TouchableOpacity>
    )
}

export default function ActionFooter({children}) {
  return (
    <View style={styles.container}>
        <View style={styles.inner}>
            {children}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
      paddingVertical:10
    },
    inner:{
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    ActionPrimaryButtonContainer:{
        flex:1,
        borderRadius: 4,
        borderColor: Colors.accentColor2a,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical:10,
        backgroundColor:Colors.accentColor2
    },
    ActionPrimaryButtonTitle:{
        fontSize:16,
        color:Colors.lightPrimaryColor,
        fontWeight:'bold',
        paddingVertical:5
    },
    ActionSecondaryButtonContainer:{
        flex:1,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical:10
    },
    ActionSecondaryButtonTitle:{
        fontSize:16,
        color:Colors.defaultPrimaryColor,
    }
  })
