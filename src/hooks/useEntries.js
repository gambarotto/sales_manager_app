import { useState, useEffect } from 'react'

import { getEntries, deleteEntry, deleteAll, saveEntry } from '../services/Entries'
import { getCurrentPeriod } from '../services/Period'

const useEntries = ( days = 7, category, seller, initialPeriod, finalPeriod, idPeriod) => {
    const [entries, setEntries] = useState([])

    useEffect(() => {

        async function loadEntries(){
            
            const period = {
                id:idPeriod,
                initialDate:initialPeriod,
                finalDate:finalPeriod
            }
            setEntries(await getEntries(days, category, seller, period))
            //console.log('useEntry ---- ',await getEntries(days))

        }

        loadEntries()


    },[days, category, seller, initialPeriod, finalPeriod,idPeriod])

    return [entries, saveEntry, deleteEntry]
}
export default useEntries