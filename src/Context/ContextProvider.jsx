import React, { useState } from 'react'
import { useEffect } from 'react'
import { createContext } from 'react'

export const AppContext = createContext()

function ContextProvider({children}) {

    const [currency,setCurrency] =  useState("INR")
    const [symbol, setSymbol] = useState("₹")
    const [login,setLogin] = useState(false)
    useEffect(() => {
        if(currency==="INR"){
            setSymbol("₹")
        }
        else if (currency==="USD"){
            setSymbol("$")
        }
    }, [currency])
    

  return (
    <AppContext.Provider value={{currency,setCurrency,symbol,login,setLogin}} >
        {children}
    </AppContext.Provider>
    
  )
}

export default ContextProvider