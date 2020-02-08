import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

import SubtitleChart from './SubtitleChart'
import MainChartSeller from './MainChartSeller'
import MainChartCategory from './MainChartCategory'
import MainModalReports from './MainModalReports'

import useCategories from '../../../hooks/useCategories'
import useSellers from '../../../hooks/useSellers'
import useBalanceSellers from '../../../hooks/useBalanceSellers'
import useBalanceCategory from '../../../hooks/useBalanceCategory'

import Colors from '../../../styles/Colors'

export default function MainPainelChart({ 
    clearQuery, 
    days, 
    category, 
    seller, 
    setDays, 
    setCategory, 
    setSeller,
    initial, 
    final, 
    idPeriod
}) {

    const [categories] = useCategories()
    const [sellersDB] = useSellers()
    const [balanceSumSellers] = useBalanceSellers(
        days, 
        seller,
        initial, 
        final, 
        idPeriod
        )
    const [balaceSumCategory] = useBalanceCategory(
        days, 
        category, 
        initial, 
        final, 
        idPeriod
        )

    const [daysCollections, setDaysCollections] = useState([
        { id: 1, days: 7 },
        { id: 2, days: 15 },
        { id: 3, days: 21 },
        { id: 4, days: 30 },
        { id: 5, days: 60 },
        { id: 6, days: 120 },
        { id: 7, days: 180 },
        { id: 8, days: 360 },
    ])


    //const [modalDay, setModalDay] = useState(7)
    const [modalDayVisible, setModalDayVisible] = useState(false)
    //const [modalCategory, setModalCategory] = useState({id:1, name:'Categorias'})
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false)
    //const [modalSeller, setModalSeller] = useState({id:1, name:'Vendedor'})
    const [modalSellerVisible, setModalSellerVisible] = useState(false)

    return (
        <View style={styles.container}>
            <View style={styles.containerButtonsFilter}>
                <TouchableOpacity
                    style={days > 7 ? styles.btnSelected : styles.btn}
                    onPress={() => setModalDayVisible(true)}
                >
                    <Text style={days > 7 ? styles.txtBtnSelected : styles.txtBtn}>
                        {`${days} Dias`}
                    </Text>
                </TouchableOpacity>
                <MainModalReports
                    data={daysCollections}
                    isVisible={modalDayVisible}
                    setIsVisible={setModalDayVisible}
                    onChangeValue={setDays}
                />

                <TouchableOpacity
                    style={category.name !== 'Categorias' ? styles.btnSelected : styles.btn}
                    onPress={() => setModalCategoryVisible(true)}>
                    <Text style={category.name !== 'Categorias' ? styles.txtBtnSelected : styles.txtBtn}>
                        {category.name}
                    </Text>
                </TouchableOpacity>
                <MainModalReports
                    data={categories}
                    isVisible={modalCategoryVisible}
                    setIsVisible={setModalCategoryVisible}
                    onChangeValue={setCategory}
                />

                <TouchableOpacity 
                    onPress={() => setModalSellerVisible(true)}
                    style={seller.name !== 'Vendedor' ? styles.btnSelected : styles.btn}>
                    <Text style={seller.name !== 'Vendedor' ? styles.txtBtnSelected : styles.txtBtn}>
                        {seller.name}
                    </Text>
                </TouchableOpacity>
                <MainModalReports
                    data={sellersDB}
                    isVisible={modalSellerVisible}
                    setIsVisible={setModalSellerVisible}
                    onChangeValue={setSeller} />
                <TouchableOpacity
                    onPress={clearQuery}
                    style={styles.clearButton}>
                    <Icon name="delete" size={25} color={Colors.backgroundLight}/>
                </TouchableOpacity>
            </View>
            <View style={[styles.containerCharts, styles.containerChartSubSeller]}>
                <MainChartSeller data={balanceSumSellers} />
                <SubtitleChart type='Seller' data={balanceSumSellers} />
            </View>
            <View style={[styles.containerCharts, styles.containerChartSubCategory]}>
                <MainChartCategory data={balaceSumCategory} />
                <SubtitleChart type='Category' data={balaceSumCategory} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
        //justifyContent: 'space-around'
    },
    containerButtonsFilter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    btn: {
        flex: 1,
        //height:50,
        maxWidth: 190,
        backgroundColor:Colors.backgroundLight,
        borderColor: Colors.lightPrimaryColor,
        //borderWidth: 2,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:10,

    },
    txtBtn: {
        color: Colors.lightPrimaryColor,
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10,

    },
    btnSelected: {
        flex: 1,
        //height:50,
        maxWidth: 190,
        backgroundColor: Colors.accentColor2,
        //borderWidth:2,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:10,
    },
    txtBtnSelected: {
        color: Colors.white2,
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10,

    },
    clearButton:{
        width:50,
        height:50,
        borderRadius:40,
        justifyContent:'center',
        alignItems:'center',
    },
    containerCharts: {
        backgroundColor: Colors.backgroundLight,
        borderRadius: 8,
        //borderWidth: 1,
        //borderColor: 'rgba(0,0,0,0.2)',
        //borderColor:Colors.accentColor

    },
    containerChartSubSeller: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containerChartSubCategory: {
        marginTop: 20,
        padding: 20,
        flexDirection: 'row',
        //justifyContent:'space-between'
    }
})