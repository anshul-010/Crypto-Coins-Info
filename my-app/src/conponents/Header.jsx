import React, { useContext } from 'react'
import "./Header.css"
import { Container,Heading } from '@chakra-ui/react'
import { AppContext } from '../Context/ContextProvider'

const Header = () => {
    const {currency,setCurrency} =  useContext(AppContext)
    console.log(currency)
  return (
    <div id='main' >
        <Container className='navbar' >
           <Heading>Traders</Heading>
        </Container>
        <Container>
            <select name="" id="selet_currency" 
            value={currency}
            onChange={(e)=>setCurrency(e.target.value)}
            >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
            </select>
            
        </Container>
    </div>
  )
}

export default Header