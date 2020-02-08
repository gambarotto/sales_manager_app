import React, {useEffect, useState} from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

import useCategories from '../../../hooks/useCategories'
//import { getAllCategories } from '../../../services/Categories'
import ModalCategory from '../../Core/ModalCategory'
import Colors from '../../../styles/Colors'

// import { Container } from './styles';

export default function EntryCategoryPicker({ isVisible, setIsVisible, onChangeValue, currentValue }) {

    const [categories] = useCategories()
    
    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={() => setIsVisible(true)}>
            <Text style={styles.txtButton}>{currentValue.name}</Text>
                <Icon name='keyboard-arrow-down' size={30} color={Colors.white} />
            </TouchableOpacity>
            <ModalCategory 
                isVisible={isVisible} 
                setIsVisible={setIsVisible} 
                onChangeValue={onChangeValue}
                categories={categories} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        backgroundColor: Colors.accentColor2,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 50,
        marginBottom: 15
    },
    txtButton: {
        color: Colors.lightPrimaryColor,
        fontSize: 20
    }
})