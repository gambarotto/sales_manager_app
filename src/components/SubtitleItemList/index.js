import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

import Colors from '../../styles/Colors'
// import { Container } from './styles';

export default function SubtitleItemList() {

  return (
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
  );
}
const styles = StyleSheet.create({
  containerSubtitles: {
    height: 60,
    width: '100%',
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  containerItemSubtitle: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textItemSubtitle: {
    paddingLeft: 5,
    color:Colors.lightPrimaryColor
  }
})