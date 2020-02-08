import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import getUUID from '../../services/UUID'
import { getAllCategories } from '../../services/Categories'

//import useSellers from '../../hooks/useSellers'
//import { saveEntry } from '../../services/Entries'
import useEntries from '../../hooks/useEntries'
import { getAllSellers } from '../../services/Sellers'

import EntryForm from '../../components/EntriesComponents/EntryForm'
import EntryList from '../../components/EntriesComponents/EntryList'
import EntryValues from '../../components/EntriesComponents/EntryValues'

import Colors from '../../styles/Colors'

export default function Entry({ navigation }) {

  function isNewEntry() { //vindo do main, passado via navigation
    const entry = navigation.getParam('item', {
      id: null,
      idEntry:null,
      description: null,
      qty: '',
      amount: '',
      discount: '',
      totalAmount:0,
      paymentMode: null,
      entryAt: new Date(),
      payAt: new Date(),
      client: null,
      seller: { id: getUUID(), name: 'Vendedor' },
      category: { id: getUUID(), name: 'Categorias' },
    })

    return entry
  }

  //const [ sellersDB ] = useSellers()

  const [,saveEntry,deleteEntries] = useEntries()

  const [valorBruto, setValorBruto] = useState(0)
  const [discountedValue, setDiscountedValue] = useState(0)
  const [valorLiquido, setValorLiquido] = useState(0)
  const [valorTrintaECinco, setValorTrintaECinco] = useState(0)

  const [entrySelected,setEntrySelected] = useState(isNewEntry())
  const [entrySelectedteste,setEntrySelectedteste] = useState()
  const [entryList, setEntryList] = useState([])
  const [categories, setCategories] = useState([])
  const [sellers, setSellers] = useState([])
  const [clearAllInputs, setClearAllInputs] = useState(false)

  useEffect(() => {
    async function loadDatas(){
      categories.length === 0 && setCategories(await getAllCategories())
      sellers.length === 0 && setSellers(await getAllSellers())
    }
    loadDatas()

  },[])
  // useEffect(()=>{
  //   setSellers(sellersDB)
  // },[sellersDB])

  function setEntrySelectedFunction (item){
    
    setEntrySelected(item)
    //console.log('passou aqui')
  }

  function finalizeSale(){
    saveEntry(entryList)
    setClearAllInputs(true)
    setEntryList([])
    navigation.navigate('Main')

  }

  function deleteEntriesFunc(){
    if(entrySelected.id){
      deleteEntries(entrySelected)
    }

      setEntrySelected({})
      setEntryList([])
      setClearAllInputs(true)
      navigation.navigate('Main')
  }

  return (
    <View style={styles.container}>
      <EntryForm 
        entrySelected={entrySelected} 
        flex={4} 
        navigation={navigation}  
        modifyList={setEntryList} 
        entryList={entryList}
        entrySelectedteste={entrySelectedteste}
        categories={categories}
        sellers={sellers}
        clearAllInputs={clearAllInputs}
        setClearAllInputs={setClearAllInputs}
         />
      <EntryList 
        data={entryList} 
        flex={5.5}
        editItemScreenEntry={setEntrySelectedFunction} />
      <EntryValues 
        entries={entryList}
        flex={2.5} 
        valorBruto={valorBruto}
        valorLiquido={valorLiquido}
        discountedValue={discountedValue}
        valorTrintaECinco={valorTrintaECinco}
        setValorBruto={setValorBruto}
        setValorLiquido={setValorLiquido}
        setDiscountedValue={setDiscountedValue}
        setValorTrintaECinco={setValorTrintaECinco}
        finalizeSale={finalizeSale}
        navigation={navigation}
        deleteEntriesFunc={deleteEntriesFunc} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    backgroundColor:Colors.defaultPrimaryColor

  },
})