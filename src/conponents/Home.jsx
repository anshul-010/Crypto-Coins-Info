import React from 'react'
import Header from './Header'
import Banner from './Banner'
import "../Styles/Home.css"
import CoinTable from './CoinTable'
import AllRoute from '../Routes/AllRoute'
import CoinDetail from './CoinDetail'

const Home = () => {
  return (
    <div id='container' >
      <Banner/>
      <CoinTable/>
    </div>
  )
}

export default Home