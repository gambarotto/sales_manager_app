import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

import Colors from '../../../styles/Colors'
// import { Container } from './styles';
import ListItem from '../../Core/ListItem'

export default function EntryList({ data, flex = 1, editItemScreenEntry}) {
    return (
        <View style={[styles.container, { flex: flex }]}>
            <FlatList
                data={data}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => <ListItem
                    item={item}
                    editItemScreenEntry={editItemScreenEntry}
                />}
                ItemSeparatorComponent={() => <View
                    style={{
                        height: 1,
                        width: '100%',
                        backgroundColor: Colors.dividerColor
                    }}>
                </View>}
            />
            <View style={styles.containerSubtitles}>

                <View style={styles.containerItemSubtitle}>
                    <Icon name="monetization-on" size={25} color={Colors.lightPrimaryColor} />
                    <Text style={styles.textItemSubtitle}>Dinheiro</Text>
                </View>
                <View style={styles.containerItemSubtitle}>
                    <Icon name="call-to-action" size={25} color={Colors.lightPrimaryColor} />
                    <Text style={styles.textItemSubtitle}>Débito</Text>

                </View>
                <View style={styles.containerItemSubtitle}>
                    <Icon name="payment" size={25} color={Colors.lightPrimaryColor} />
                    <Text style={styles.textItemSubtitle}>Crédito</Text>

                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft:5
    },
    containerSubtitles: {
        height: 60,
        width: '100%',
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        //backgroundColor:'red'
    },
    containerItemSubtitle: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    textItemSubtitle:{
        paddingLeft:5,
        color:Colors.lightPrimaryColor,
    }
})