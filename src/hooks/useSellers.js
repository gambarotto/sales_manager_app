import { useState, useEffect } from 'react'

import { getAllSellers } from '../services/Sellers'

export default function useSellers(){

    const [sellersDB, setSellersDB] = useState()

    useEffect(() =>{
        let didMount = true
        async function loadData(){
            try {
                didMount && setSellersDB(await getAllSellers())                
            } catch (error) {
                console.log('useSellers ::', error)
            }
        }
        loadData()
        return () => {
            didMount = false
        }
    },[]) 

    return [sellersDB]
}