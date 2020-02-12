import Realm from 'realm'
import AsyncStorage from '@react-native-community/async-storage'

import CategorySchema from '../schemas/CategorySchema'
import EntrySchema from '../schemas/EntrySchema'
import SellerSchema from '../schemas/SellerSchema'
import SalesPeriodSchema from '../schemas/SalesPeriodSchema'

import { getDefaultCategories } from './Categories'
import { getDefaultSellers } from './Sellers'

export const getRealm = async () => {

    const realm = await Realm.open({
        schema: [CategorySchema, EntrySchema, SellerSchema, SalesPeriodSchema],
        //schema: [CategorySchema, EntrySchema, SellerSchema],

        deleteRealmIfMigrationNeeded: true,
        //createInRealm:'withValue',
        schemaVersion: 1,

    })
    //dropDB(realm) //-- deleta o banco (reamldb / asyncStorage)
    initDB(realm)


    return realm
}

export const initDB = async realm => {
    const init = await AsyncStorage.getItem('initDB')
    if (init !== 'true') {
        initCategories(realm)
        initSellers(realm)
        await AsyncStorage.setItem('initDB', 'true')
    }
}

async function initCategories(realm) {

    const categoriesLength = await realm.objects('Category').length
    //console.log('length ,', categoriesLength);

    if (categoriesLength === 0) {

        const categories = getDefaultCategories()

        try {
            realm.write(() => {
                categories.forEach(category => {
                    console.log(`initDB :: creating category: ${JSON.stringify(category)}`);

                    realm.create('Category', category, true)
                })
            })
            //console.log(`initDB :: creating category `);

        } catch (error) {
            console.log(`initDB :: error creating category: ${error}`)
        }
    } else {
        //console.log(`initDB :: DB already initialized...`);

    }
}
function initSellers(realm) {
    const sellersLength = realm.objects('Seller').length

    if (sellersLength === 0) {
        const sellers = getDefaultSellers()

        try {
            realm.write(() => {
                sellers.forEach(seller => {
                    console.log(`initDB :: creating seller: ${JSON.stringify(seller)}`);
                    realm.create('Seller', seller, true)
                })
            })
            //console.log(`initDB :: creating seller `);
        } catch (error) {
            console.log(`initDB :: error creating seller: ${error}`)
        }
    } else {
        //console.log(`initDB :: DB already initialized...`);
    }
}

async function cleanInitialized() {
    try {
        await AsyncStorage.clear()


    } catch (error) {
        console.log(`clearDB AsyncStorage :: error : ${error}`)
    }
}

export const dropDB = realm => {
    realm.write(() => {
        realm.deleteAll()
    })
    cleanInitialized()
}
