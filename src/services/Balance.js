import getUUID from '../services/UUID'
import { getRealm } from './Realm'
import _ from 'lodash'
import moment from '../vendors/moment'
import Colors from '../styles/Colors'

export const getBalanceByEspecificSeller = async (days = 7, sellerSelected, period) => {
    //console.log('gbbes',period.finalDate);

    const realm = await getRealm()

    let entries = realm.objects('Entry')

    if (days > 0) {
        const date = moment().subtract(days, 'days').toDate()
        entries = entries.filtered('entryAt >= $0', date)
    }
    if (period && period.id) {
        const initialDate = moment(period.initialDate).toDate()
        const finalDate = moment(period.finalDate).toDate()
        entries = entries.filtered(`entryAt >= $0`, initialDate)
        entries = entries.filtered(`entryAt <= $0`, finalDate)
    }

    if (sellerSelected && sellerSelected.id) {
        entries = entries.filtered('seller.id == $0', sellerSelected.id)
    }

    entries = _(entries)
        .groupBy(({ seller: { id } }) => id)
        .map(entry => ({
            seller: _.omit(entry[0].seller, 'entries'),
            totalAmount: Math.abs(_.sumBy(entry, 'totalAmount')),
            totalAmountLiq: Math.abs(_.sumBy(entry, 'totalAmountLiq')),
            discountedValue: Math.abs(_.sumBy(entry, 'discountedValue'))
        }))
        .filter(({ seller }) => seller.name === sellerSelected.name)
        .filter(({ totalAmount }) => totalAmount > 0)


    return entries
}
export const getBalanceByEspecificCategory = async (days = 7, categorySelected, period) => {
    const realm = await getRealm()

    let entries = realm.objects('Entry')

    if (days > 0) {
        const date = moment().subtract(days, 'days').toDate()
        entries = entries.filtered('entryAt >= $0', date)
    }
    if (period && period.id) {
        const initialDate = moment(period.initialDate).toDate()
        const finalDate = moment(period.finalDate).toDate()
        entries = entries.filtered(`entryAt >= $0`, initialDate)
        entries = entries.filtered(`entryAt <= $0`, finalDate)
    }

    entries = _(entries)
        .groupBy(({ category: { id } }) => id)
        .map(entry => ({
            category: _.omit(entry[0].category, 'entries'),
            totalAmount: Math.abs(_.sumBy(entry, 'totalAmount')),
        }))
        .filter(({ category }) => category.name === categorySelected.name)
        .filter(({ totalAmount }) => totalAmount > 0)

    //console.log('especific category balance: ',entries);

    return entries
}

export const getBalanceBySeller = async (days = 7, period) => {
    const realm = await getRealm()
    
    
    let entries = realm.objects('Entry')

    if (days > 0) {
        const date = moment().subtract(days, 'days').toDate()
        entries = entries.filtered('entryAt >= $0', date)
    }
    
    if (period && period.id) {
        const initialDate = moment(period.initialDate).toDate()
        const finalDate = moment(period.finalDate).toDate()
        
        entries = entries.filtered(`entryAt >= $0`, initialDate)
        entries = entries.filtered(`entryAt <= $0`, finalDate)

    }


    entries = _(entries)
        .groupBy(({ seller: { id } }) => id)
        .map(entry => ({
            seller: _.omit(entry[0].seller, 'entries'),
            totalAmount: Math.abs(_.sumBy(entry, 'totalAmount')),
            totalAmountLiq: Math.abs(_.sumBy(entry, 'totalAmountLiq')),
            discountedValue: Math.abs(_.sumBy(entry, 'discountedValue'))
        }))
        .filter(({ totalAmount }) => totalAmount > 0)
        .orderBy('totalAmount', 'desc')

    return entries
}

export const getBalanceByCategory = async (days = 7, showOthers = true, period) => {
    const realm = await getRealm()
    
    let entries = realm.objects('Entry')

    if (days > 0) {
        const date = moment().subtract(days, 'days').toDate()
        entries = entries.filtered('entryAt >= $0', date)
    }
    if (period && period.id) {
        const initialDate = moment(period.initialDate).toDate()
        const finalDate = moment(period.finalDate).toDate()
        entries = entries.filtered(`entryAt >= $0`, initialDate)
        entries = entries.filtered(`entryAt <= $0`, finalDate)
    }

    entries = _(entries)
        .groupBy(({ category: { id } }) => id)
        .map(entry => ({
            category: _.omit(entry[0].category, 'entries'),
            totalAmount: Math.abs(_.sumBy(entry, 'totalAmount')),
            qty:Math.abs(_.sumBy(entry,'qty'))
        }))
        .filter(({ totalAmount }) => totalAmount > 0)
        .orderBy('totalAmount', 'desc')

    const othersLimit = 3

    if (showOthers && _(entries).size() > othersLimit) {
        const data1 = _(entries.slice(0, othersLimit))
        const data2 = [
            {
                category: {
                    id: getUUID(),
                    name: 'Outros',
                    color: Colors.metalDark
                },
                totalAmount: _(entries)
                    .slice(othersLimit)
                    .map(({ totalAmount }) => totalAmount)
                    .sum()
            }
        ]
        entries = [...data1, ...data2]
    }

    return entries
}

export const getBalance = async (days = 7, type = 'total', period) => {
    const realm = await getRealm()

    let balance = realm.objects('Entry')

    if (days > 0) {
        const date = moment().subtract(days, 'days').toDate()
        balance = balance.filtered('entryAt >= $0', date)
    }
    if (period && period.id) {
        const initialDate = moment(period.initialDate).toDate()
        const finalDate = moment(period.finalDate).toDate()
        balance = balance.filtered(`entryAt >= $0`, initialDate)
        balance = balance.filtered(`entryAt <= $0`, finalDate)
        // balance = balance.filtered(`entryAt >= "${initialDate}" AND entryAt <= "${finalDate}"`)
        // console.log('aq ', initialDate, finalDate);
        
    }

    const valueTotal = balance.sum('totalAmount')
    const totalAmountLiqBalance = balance.sum('totalAmountLiq')
    const totalDiscountedValue = balance.sum('discountedValue')

    if (type === 'total') {
        return valueTotal
    } else if (type === 'liquid') {
        return totalAmountLiqBalance
    } else if (type === '35') {
        const value = (valueTotal - totalAmountLiqBalance) * (5 / 100)
        return value + totalAmountLiqBalance
    } else {
        return totalDiscountedValue
    }

}