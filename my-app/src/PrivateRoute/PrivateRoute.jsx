import React, {useContext} from "react"
import { Navigate, useLocation } from "react-router-dom"
import { AppContext } from "../Context/ContextProvider"

export default function PrivateRoute({children}){
    const {login} = useContext(AppContext)
    const location = useLocation();
    if(!login){
        return (<Navigate to="/login" state={location.pathname} replace={true} />)
    }
    return children
}