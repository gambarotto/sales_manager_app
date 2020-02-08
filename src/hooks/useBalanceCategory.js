import { useState, useEffect } from 'react'
import { getBalanceByCategory, getBalanceByEspecificCategory, getBalanceByEspecific } from '../services/Balance'

export default function useBalanceCategory(
    days = 7, 
    category, 
    initialPeriod, 
    finalPeriod, 
    idPeriod
    ){

    const [balaceSumCategory, setBalanceSumCategory] = useState([])

    useEffect(() => {
        
        async function loadBalanceSumByCategory(){
            let data = []
            const period = {
                id:idPeriod,
                initialDate:initialPeriod, 
                finalDate:finalPeriod
            }
            if (category && category.id !== 1){

                data = await getBalanceByEspecificCategory(days, category, period)
            }else{
                
                data = await getBalanceByCategory(days,true,period)
            }
            setBalanceSumCategory([...data])
        }

        loadBalanceSumByCategory()
        
    },[days, category, initialPeriod, finalPeriod, idPeriod])

    return [balaceSumCategory]
} 