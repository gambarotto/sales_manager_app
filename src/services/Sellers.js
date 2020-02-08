import getUUID from './UUID'
import Colors from '../styles/Colors'
import {getRealm} from './Realm'

export const getDefaultSellers = () =>{
    return [
        {
            id:getUUID(),
            name:'Daiana',
            color:Colors.violetDark,
            isInit:true,
            order:0,
        },
        {
            id:getUUID(),
            name:'Noemia',
            color:Colors.greenDark,
            isInit:true,
            order:1,
        },
        {
            id:getUUID(),
            name:'Diego',
            color:Colors.blue,
            isInit:true,
            order:2,
        },
    ]
}
export const getAllSellers = async() => {
    const realm = await getRealm()

    return realm.objects('Seller').sorted('order')
}