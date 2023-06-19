import React, { useState,useContext, useEffect } from 'react'
import { AppContext } from '../Context/ContextProvider'
import "./CoinChart.css"
import axios from 'axios'
import { Spinner } from '@chakra-ui/react'
import { Line } from 'react-chartjs-2';
import { LineController, LineElement } from 'chart.js'
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';


const CoinChart = ({coin}) => {
  Chart.register(CategoryScale);
  let id = (coin?.id)
  const [chartData,setChartData] = useState("")
  const [days,setDays] = useState(1)

  const {currency} = useContext(AppContext)

  async function fetchCoinChartData(){
    await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${currency}&days=${days}`)
    .then((res)=>{
      setChartData(res.data.prices)
    })
  }

  useEffect(()=>{
    fetchCoinChartData()
  },[currency,days])

  console.log(chartData)

  return (
    <div className='coinChart'>
        {
          !chartData?(
            <Spinner
            style={{
            height:"150px",
            width:"150px",
            color:"gold"
            }}
          />
          ):(<>
            <Line
              data={{
                labels: chartData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: chartData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1.5,
                  },
                },
              }}
            />
            <div className='buttons' >
                <button onClick={()=>setDays(24)}>24 Hours</button>
                <button onClick={()=>setDays(30)}>1 Month</button>
                <button onClick={()=>setDays(150)}>5 Months</button>
                <button onClick={()=>setDays(360)}>1 Year</button>
            </div>
          </>)
        }
    </div>
  )
}

export default CoinChart