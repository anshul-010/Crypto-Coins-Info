import React, {useContext} from "react"
import { Navigate } from "react-router-dom"
import { AppContext } from "../Context/ContextProvider"

export default function PrivateRoute({children}){
    const {login} = useContext(AppContext)

    if(!login){
        return (<Navigate to="/login" />)
    }
    return children
}