import { useState, useEffect } from 'react'

import { savePeriod, getCurrentPeriod } from '../services/Period'

export default function usePeriod(initialPeriod, finalPeriod){

    const [currentPeriod, setCurrentPeriod] = useState()

    useEffect(() => {
        async function loadCurrentPeriod(){
            // const data = await getCurrentPeriod()
            // //console.log(data);
            // setCurrentPeriod(data)
            
        }

        loadCurrentPeriod()
    },[initialPeriod,finalPeriod])

    return [getCurrentPeriod,savePeriod]
}