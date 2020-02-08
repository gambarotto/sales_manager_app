import { useState, useEffect } from 'react'

import { getBalance } from '../services/Balance'

export default function useBalance(days = 7){

    const [balance, setBalance] = useState(0)
    const [balanceLiq, setBalanceLiq] = useState(0)
    const [balance35, setBalance35] = useState(0)
    const [balanceDiscountedValue, setbalanceDiscountedValue] = useState(0)


    useEffect(() => {

        async function loadBalance(){
        
             setBalance(await getBalance(days,'total'))
             setBalanceLiq(await getBalance(days,'liquid'))
             setBalance35(await getBalance(days,'35'))
             setbalanceDiscountedValue(await getBalance(days,'discounted'))
        }
        loadBalance()

    },[days])

    return [balance, balanceLiq, balance35, balanceDiscountedValue]
} 