import AsyncStorage from '@react-native-community/async-storage'

import {getRealm} from './Realm'

export const savePeriod = async (period) => {
    const realm = await getRealm()

    let data = {}

    try {
        realm.write( async () => {
            data = {
                id: period.id,
                initialDate:period.initialDate,
                finalDate: period.finalDate
            }
            realm.create('Period',data,true)
            try {
                await AsyncStorage.setItem('currentPeriod', JSON.stringify(data))
                .then(console.log(' savePeriod method AsyncStorage :: ', JSON.stringify(data)))
            } catch (error) {
                console.log('error savePeriod method AsyncStorage :: ', error)
            }
        })
    } catch (error) {
        console.log('error on savePeriod method :: ', error)
    }
}

export const getCurrentPeriod = async () => {

    const currentPeriod = await AsyncStorage.getItem('currentPeriod')

    if(currentPeriod === null){
        console.log('Sem Dados no AsyncStorage Period');
    }else {
        return JSON.parse(currentPeriod)
    }
}