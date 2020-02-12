import getUUID from './UUID'
import Colors from '../styles/Colors'
import {getRealm} from './Realm'

export const getDefaultCategories = () =>{
    return [
        {
            id:'1',
            name:'Fashion',
            isInit:true,
            order:0,
            color:Colors.turquese,
        },
        {
            id:'2',
            name:'Plus Size',
            isInit:true,
            order:1,
            color:Colors.blue,

        },
        {
            id:'3',
            name:'Cintas',
            isInit:true,
            order:2,
            color:Colors.red,
            
        },
        {
            id:'4',
            name:'Infantil/Juvenil',
            isInit:true,
            order:3,
            color:Colors.magentaRoxo,

        },
        {
            id:'5',
            name:'Roupa de Ginástica',
            isInit:true,
            order:4,
            color:Colors.violet,

        },
        {
            id:'6',
            name:'Sensual',
            isInit:true,
            order:5,
            color:Colors.redDark,
        },
        {
            id:'7',
            name:'Meia',
            isInit:true,
            order:6,
            color:Colors.green,

        },
        {
            id:'8',
            name:'Cueca',
            isInit:true,
            order:7,
            color:Colors.orange,

        },
        {
            id:'9',
            name:'Pijama e Camisola',
            isInit:true,
            order:8,
            color:Colors.blueDark,

        },
        {
            id:'10',
            name:'Calcinha',
            isInit:true,
            order:9,
            color:Colors.carbon,

        },
        {
            id:'11',
            name:'Sutiã',
            isInit:true,
            order:10,
            color:Colors.asphalt,

        },
        {
            id:'12',
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

