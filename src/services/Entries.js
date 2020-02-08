import { getRealm } from './Realm'
import getUUID from '../services/UUID'
import moment from '../vendors/moment'
import _ from 'lodash'

export const saveEntry = async (entries) => {
    const realm = await getRealm()

    let data = {}

    //const { id, amount, entryAt, category, photo, address, latitude, longitude } = value

    const idEntry = getUUID()
    try {
        // console.log(value)
        realm.write(() => {
            entries.forEach(entry => {

                data = {
                    id: entry.id,
                    idEntry: entry.idEntry || idEntry,
                    description: entry.description,
                    qty: parseInt(entry.qty),
                    amount: parseFloat(entry.amount),
                    discount: parseFloat(entry.discount),
                    totalAmount: entry.totalAmount,
                    discountedValue: entry.discountedValue,
                    totalAmountLiq: entry.totalAmountLiq,
                    paymentMode: entry.paymentMode,
                    entryAt: entry.entryAt,
                    payAt: entry.payAt,
                    client: entry.client,
                    seller: entry.seller,
                    category: entry.category,
                    isInit: false
                }

                console.log('saveEntry :: ', JSON.stringify(data))
                realm.create('Entry', data, true)
            })
        })

    } catch (error) {
        console.error(
            'saveEntry :: error on save object: ', error
        )
    }
    return data
}

export const getEntries = async (days = 7, categorySelected, sellerSelected, period) => {
    let realm = await getRealm()

    realm = realm.objects('Entry') //recebo todos os entries

    if (days > 0) {
        const date = moment().subtract(days, 'days').toDate() // data de hj menos 7 dias
        if (period && period.id) {
            const initialDate = moment(period.initialDate).toDate()
            const finalDate = moment(period.finalDate).toDate()
            // console.log(finalDate, period.finalDate);
            realm = realm.filtered(`entryAt >= $0`, initialDate)
            realm = realm.filtered(`entryAt <= $0`, finalDate)
        }

        realm = realm.filtered('entryAt >= $0', date) //filtra os dados do realm

    }

    if (sellerSelected && sellerSelected.id !== 1) {
        realm = realm.filtered('seller.id == $0', sellerSelected.id) //filtra os dados do realm
    }

    if (categorySelected && categorySelected.id !== 1) {
        //realm = realm.filtered('category.id == $0', categorySelected.id) //filtra os dados do realm

        realm = realm.filtered(`category.id == "${categorySelected.id}"`) //filtra os dados do realm
    }

    const entries = realm.sorted('entryAt', true)

    return entries

}

export const deleteEntry = async entry => {
    const realm = await getRealm()

    try {
        realm.write(() => {
            realm.delete(entry)
        })
    } catch (error) {
        console.log('DeleteEntry :: ', error)
    }
}