import React from 'react'
import { Routes,Route} from "react-router-dom";
import Home from '../conponents/Home';
import CoinDetail from '../conponents/CoinDetail';
import Login from '../conponents/Login';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const AllRoute = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/coin/:id' element={<PrivateRoute><CoinDetail/></PrivateRoute>} />
        </Routes>
    </div>
  )
}

export default AllRoute