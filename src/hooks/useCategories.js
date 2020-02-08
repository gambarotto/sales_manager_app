import React, { useState, useEffect } from 'react'

import { getAllCategories } from '../services/Categories'
export default function useCategories(){

    const [categories, setCategories] = useState()

    useEffect(()=>{

        async function loadCategories(){
            setCategories(await getAllCategories())
            //console.log(JSON.stringify(categories));
            
        } 
        loadCategories()
    },[])

    return [categories]
}