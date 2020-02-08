import React from 'react';
import { View, StyleSheet } from 'react-native';

import Colors from '../../../styles/Colors'

export default function Container({
    children, 
    stylesMargim = false, 
    stylesMargimBottom = false,
    backgroundColor = null,
    flex = 1    
}) {
  return (
    <View style={[
        styles.container, 
        stylesMargim && {marginRight:3},
        stylesMargimBottom && {marginBottom:3},
        backgroundColor && {backgroundColor:backgroundColor},
        flex && {flex:flex}
    ]}>
        {children}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        //minHeight:'100%',
        //padding:10,
        shadowColor:Colors.magentaRoxo,
        elevation:5,
        backgroundColor:Colors.white,
        //borderRadius:8,
        //borderWidth:1,
        borderColor:'rgba(0,0,0,0.3)'
    },
})
