import React, { useContext, useEffect, useState } from "react";
import "../Styles/Banner.css";
import { Heading } from "@chakra-ui/react";
import { AppContext } from "../Context/ContextProvider";
import AliceCarousel from "react-alice-carousel";
import axios from "axios";
import { Link } from "react-router-dom";

function Banner() {
  const { currency, symbol } = useContext(AppContext);
  const [trandingCoin, setTrandingCoin] = useState([]);

  function fetchTrandingCoin(currency) {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
      )
      .then((res) => {
        setTrandingCoin(res.data);
      });
  }
  useEffect(() => {
    fetchTrandingCoin(currency);
  }, [currency]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const responsive = {
    0: {
      items: 2,
    },

    512: {
      items: 4,
    },
  };
  const item = trandingCoin.map((coin) => {
    const profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link to={`/coin/${coin.id}`} className="carouselItem">
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <br />
        <span style={{ color: "white" }}>
          {coin?.symbol}
          &nbsp;
          <span
            onClick={() => alert(coin.id)}
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <br />
        <span style={{ fontSize: 22, fontWeight: 500, color: "white" }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  return (
    <div className="banner">
      <Heading
        as="h1"
        style={{
          fontWeight: "bolder",
          fontSize: "40px",
          fontFamily: "serif",
          color: "white",
          textAlign: "center",
          padding: "100px 0 20px",
        }}
      >
        Hot List
      </Heading>
      <div className="text">
        <Heading
          lineHeight="tall"
          style={{ fontFamily: "serif", fontSize: "27px" }}
        >
          Start With Popular CyptotoCurrencies
        </Heading>
      </div>
      <div className="Carousel">
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1500}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          autoPlay
          items={item}
        />
      </div>
    </div>
  );
}

export default Banner;
