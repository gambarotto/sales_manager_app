import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Colors from '../../../styles/Colors'

export default function EntryDatePicker({ setDatePickerData, isVisible, setIsVisible, title, disabled = false }) {

    function showDatePicker() {
        setIsVisible(true)
    }

    function hideDatePicker() {
        setIsVisible(false)
    }

    function handleConfirm(date) {
        setDatePickerData(date)
        console.log('EntryDatePicker :: handleConfirm :: ',JSON.stringify(date))
        hideDatePicker()
    }

    return (
        <View>

            <TouchableOpacity 
                onPress={showDatePicker} 
                style={[styles.button, disabled && {backgroundColor:Colors.champagne}]}
                disabled={disabled}>
                <Icon name='today' size={30} color={Colors.white} />
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isVisible}
                mode='date'
                date={new Date()}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        
    },
    button:{
        width:150,
        height:60,
        flexDirection:'row',
        borderRadius:30,
        backgroundColor:Colors.accentColor2,
        alignItems:'center',
        justifyContent:'center'
    },
    title:{
        paddingLeft:10,
        color:Colors.lightPrimaryColor,
        fontSize:18
    }
})