import React from 'react';
import { View, FlatList } from 'react-native';

import Colors from '../../../../styles/Colors'
import SubtitleItemListSellers from './SubtitleItemListSellers'
import SubtitleItemListCategory from './SubtitleItemListCategory'


export default function SubtitleChart({type, data}) {
  
    return (
    <View>
        {
            type === 'Seller'
            ? (
                <FlatList
                data={data}
                keyExtractor={item => String(item.seller.id)}
                renderItem={({item}) => <SubtitleItemListSellers 
                    item={item}    
                    /> }
                /> 
            )
            : (
                <FlatList
                data={data}
                keyExtractor={item => String(item.category.id)}
                renderItem={({item}) => <SubtitleItemListCategory 
                        item={item}
                    />} 
                />
            )
        }
    </View>
  );
}
