import getUUID from './UUID'
import Colors from '../styles/Colors'
import {getRealm} from './Realm'

export const getDefaultCategories = () =>{
    return [
        {
            id:getUUID(),
            name:'Fashion',
            isInit:true,
            order:0,
            color:Colors.turquese,
        },
        {
            id:getUUID(),
            name:'Plus Size',
            isInit:true,
            order:1,
            color:Colors.blue,

        },
        {
            id:getUUID(),
            name:'Cintas',
            isInit:true,
            order:2,
            color:Colors.red,
            
        },
        {
            id:getUUID(),
            name:'Infantil/Juvenil',
            isInit:true,
            order:3,
            color:Colors.magentaRoxo,

        },
        {
            id:getUUID(),
            name:'Roupa de Ginástica',
            isInit:true,
            order:4,
            color:Colors.violet,

        },
        {
            id:getUUID(),
            name:'Sensual',
            isInit:true,
            order:5,
            color:Colors.redDark,
        },
        {
            id:getUUID(),
            name:'Meia',
            isInit:true,
            order:6,
            color:Colors.green,

        },
        {
            id:getUUID(),
            name:'Cueca',
            isInit:true,
            order:7,
            color:Colors.orange,

        },
        {
            id:getUUID(),
            name:'Pijama e Camisola',
            isInit:true,
            order:8,
            color:Colors.blueDark,

        },
        {
            id:getUUID(),
            name:'Calcinha',
            isInit:true,
            order:9,
            color:Colors.carbon,

        },
        {
            id:getUUID(),
            name:'Sutiã',
            isInit:true,
            order:10,
            color:Colors.asphalt,

        },
        {
            id:getUUID(),
            name:'Conjunto',
            isInit:true,
            order:11,
            color:Colors.orangeDark,

        },
    ]
}

export const getAllCategories = async() => {
    const realm = await getRealm()

    return realm.objects('Category').sorted('order')
}

