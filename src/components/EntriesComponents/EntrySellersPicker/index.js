import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
// import { Container } from './styles';
import Colors from '../../../styles/Colors'

export default function EntrySellersPicker() {
    return (
        <TouchableOpacity style={styles.container}>
            <Text style={styles.txtButton}>Vendedor</Text>
            <Icon name='keyboard-arrow-down' size={30} color={Colors.white} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height:70,
        backgroundColor:Colors.accentColor,
        borderRadius:4,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:50,
        marginBottom:15
    },
    txtButton:{
        color:Colors.white,
        fontSize:20
    }
})