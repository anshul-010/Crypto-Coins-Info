import React from 'react'
import { Routes,Route,Link } from "react-router-dom";
import Home from '../conponents/Home';
import CoinDetail from '../conponents/CoinDetail';
import Login from '../conponents/Login';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const AllRoute = () => {
  return (
    <div>
        {/* <Link to="/">Home</Link> */}
        {/* <Link to="/coin">Coin</Link> */}
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/coin/:id' element={<PrivateRoute><CoinDetail/></PrivateRoute>} />
        </Routes>
    </div>
  )
}

export default AllRoute