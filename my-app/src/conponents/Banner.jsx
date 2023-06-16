import React from 'react'
import "./Banner.css"
import { Heading,Highlight } from '@chakra-ui/react'

function Banner() {
  return (
    <div className='banner'  >
        <Heading as='h1' style={{ fontWeight:"bolder" ,color:"white",textAlign:"center",padding:"100px 0 20px" }}>Hot List</Heading>
        <div className='text'>
        <Heading lineHeight='tall'>
                Start With Popular CyptotoCurrencies
            </Heading>
        </div>
    </div>
  )
}

export default Banner