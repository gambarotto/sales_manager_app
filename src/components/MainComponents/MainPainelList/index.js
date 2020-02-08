import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

import SubtitleItemList from '../../SubtitleItemList'

import useEntries from '../../../hooks/useEntries'
import MainPainelListItem from './MainPainelListItem'

import Colors from '../../../styles/Colors'

export default function MainPainelList({ 
    onEntryPress, 
    days, 
    category, 
    seller, 
    initialDate,
    finalDate, 
    idPeriod,
    }) {

    const [entries] = useEntries(days, category, seller, initialDate,finalDate,idPeriod)
    const [valueInput, setValueInput] = useState('')
    const [dataFiltered, setDataFiltered] = useState([])

    function searchInFlatList(search) {

        setValueInput(search)

        const entriesFiltered = entries.filter(entry => {
            const upItem = `${entry.client.toUpperCase()}`
            const textSearched = search.toUpperCase()
            return upItem.indexOf(textSearched) > -1
        })
        setDataFiltered(entriesFiltered)
    }

    return (
        <View style={styles.container}>
            <View
                style={styles.containerTitle}>
                <View
                    style={[styles.containerIcon, valueInput && { backgroundColor: Colors.accentColor2 }]}>
                    <Icon
                        name="search"
                        size={25}
                        color={Colors.lightPrimaryColor} />
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={text => searchInFlatList(text)}
                    value={valueInput} />
            </View>
            <View style={{height:'88%'}}>
                <FlatList
                    
                    data={valueInput ? dataFiltered : entries}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => <MainPainelListItem
                        item={item}

                        onEntryPress={onEntryPress}
                    />}
                    ItemSeparatorComponent={() => <View
                        style={{
                            height: 1,
                            width: '100%',
                            backgroundColor: Colors.dividerColor
                        }}>
                    </View>}
                />
            </View>
            <View style={styles.containerSubtitle}>
                <SubtitleItemList />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between'
    },
    containerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.backgroundLight,
        borderRadius: 30

    },
    containerIcon: {
        width: 40,
        height: 42,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
    },
    input: {
        //      flex:1,
        minHeight: 40,
        minWidth: '100%',
        color: Colors.lightPrimaryColor,
        fontSize: 18,
        borderRadius: 20,
        marginLeft: 5,
    },
    containerSubtitle: {
        flex:1,
        alignSelf: 'flex-end',
        alignContent: 'flex-end',
        //elevation:5
    }
})