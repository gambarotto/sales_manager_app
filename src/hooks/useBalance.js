import { useState, useEffect } from 'react'

import { getBalance } from '../services/Balance'

export default function useBalance(days = 7, initialPeriod, finalPeriod, idPeriod){

    const [balance, setBalance] = useState(0)
    const [balanceLiq, setBalanceLiq] = useState(0)
    const [balance35, setBalance35] = useState(0)
    const [balanceDiscountedValue, setbalanceDiscountedValue] = useState(0)


    useEffect(() => {
        
        async function loadBalance(){
            let period = {
                id:idPeriod,
                initialDate:initialPeriod,
                finalDate:finalPeriod
            }
    
             setBalance(await getBalance(days,'total',period))
             setBalanceLiq(await getBalance(days,'liquid',period))
             setBalance35(await getBalance(days,'35',period))
             setbalanceDiscountedValue(await getBalance(days,'discounted',period))
        }
        loadBalance()

    },[days, initialPeriod, finalPeriod, idPeriod])

    return [balance, balanceLiq, balance35, balanceDiscountedValue]
} 