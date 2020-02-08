import { useState, useEffect } from 'react'
import { getBalanceBySeller, getBalanceByEspecificSeller } from '../services/Balance'

export default function useBalanceSellers(days = 7, seller, initialPeriod, finalPeriod, idPeriod ){

    const [balanceSumSellers, setBalanceSumSellers] = useState([])

    useEffect(() => {
        async function loadBalanceSumBySeller(){

            setBalanceSumSellers([])
            let data = []
            const period = {
                id:idPeriod,
                initialDate:initialPeriod,
                finalDate:finalPeriod
            }
            if(seller && seller.id !== 1){
                data = await getBalanceByEspecificSeller(days,seller, period)
            }else{
                data = await getBalanceBySeller(days, period)
            }
            
            setBalanceSumSellers([...data])
            //console.log('useBalanceSumBySeller ', data)
        }

        loadBalanceSumBySeller()
    },[days,seller,initialPeriod, finalPeriod, idPeriod])

    return [balanceSumSellers]
}