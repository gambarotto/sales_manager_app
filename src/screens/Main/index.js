import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

import usePeriod from '../../hooks/usePeriod'
import ModalPeriod from './ModalPeriod'
import MainPainelValues from '../../components/MainComponents/MainPainelValues'
import MainPainelChart from '../../components/MainComponents/MainPainelChart'
import MainPainelList from '../../components/MainComponents/MainPainelList'

import moment from '../../vendors/moment'
import Colors from '../../styles/Colors'

export default function Main({ navigation }) {

  const modalPeriod = navigation.getParam('modal', {
    id: '',
    initialDate: '',
    finalDate: ''
  })
  const [getCurrentPeriod] = usePeriod()

  const [initialPeriod, setInitialPeriod] = useState(modalPeriod.initialDate)
  const [finalPeriod, setFinalPeriod] = useState(modalPeriod.finalDate)
  const [idPeriod, setIdPeriod] = useState(modalPeriod.id)
  const [periodAltered, setPeriodAltered] = useState(false)

  const [category, setCategory] = useState({ id: 1, name: 'Categorias' })
  const [seller, setSeller] = useState({ id: 1, name: 'Vendedor' })
  const [days, setDays] = useState(7)
  const [modalPeriodIsVisible, setModalPeriodIsVisible] = useState(modalPeriod.modal)

  useEffect(() => {

    async function loadCurrentPeriod() {
      const data = await getCurrentPeriod()
      if(data){
        setInitialPeriod(data.initialDate)
        setFinalPeriod(data.finalDate)
        setIdPeriod(data.id)
      }

    }
    loadCurrentPeriod()
  }, [])

  useEffect(() => {

  }, [periodAltered])

  function onEntryPress(item) {
    navigation.navigate('Entry', { item })
  }
  function clearQuery() {
    setCategory({ id: 1, name: 'Categorias' })
    setSeller({ id: 1, name: 'Vendedor' })
    setDays(7)
  }
  function handleChangePeriod() {
    setModalPeriodIsVisible(true)
  }

  return (

    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <ScrollView style={{ height: '35%' }}>
          <ModalPeriod
            isVisiblePeriod={modalPeriodIsVisible}
            setIsVisiblePeriod={setModalPeriodIsVisible}
            id={idPeriod}
            initial={initialPeriod}
            setInitial={setInitialPeriod}
            final={finalPeriod}
            setFinal={setFinalPeriod}
            setPeriodAltered={setPeriodAltered} />
          <MainPainelValues
            title={initialPeriod &&
              `Vendas no periodo de ${moment(initialPeriod).format('DD/MM/YY')} até ${moment(finalPeriod).format('DD/MM/YY')}`
            }
            days={days}
            handleChangePeriod={handleChangePeriod}
            initial={initialPeriod}
            final={finalPeriod}
            idPeriod={idPeriod} />
        </ScrollView>
        <View style={{ flex: 7 }}>
          <MainPainelChart
            clearQuery={clearQuery}
            days={days}
            setDays={setDays}
            category={category}
            setCategory={setCategory}
            seller={seller}
            setSeller={setSeller}
            initial={initialPeriod}
            final={finalPeriod}
            idPeriod={idPeriod} />
        </View>
      </View>

      <View style={styles.containerList}>
        <MainPainelList
          onEntryPress={onEntryPress}
          days={days}
          category={category}
          seller={seller}
          initialDate={initialPeriod}
          finalDate={finalPeriod}
          periodAltered={periodAltered}
          idPeriod={idPeriod} />
      </View>

      <TouchableOpacity style={styles.buttonAdd} onPress={() => navigation.navigate('Entry')}>
        {<Icon name='add' size={46} color={Colors.lightPrimaryColor} />}
        {/*<View style={styles.containerImg}>
          <Image style={styles.img} source={require('../../assets/images/finances-logo2-dark.png')} />
        </View>*/}
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.defaultPrimaryColor
  },
  containerInfo: {
    flex: 1,
    backgroundColor: Colors.defaultPrimaryColor

  },
  containerList: {
    flex: 1,
  },
  buttonAdd: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: Colors.accentColor2,
    bottom: 30,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  },
  containerImg:{
    width:65,
    height:60
  },
  img:{
    width:'100%',
    height:'100%'
  }
})