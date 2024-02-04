import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../Context/ContextProvider";
import axios from "axios";
import { useEffect } from "react";
import "../Styles/CoinDetail.css";
import CoinChart from "./CoinChart";
import { Heading, Text, border } from "@chakra-ui/react";
import { numberWithCommas } from "./CoinTable";

function CoinDetail() {
  const { id } = useParams();
  const { currency, symbol } = useContext(AppContext);

  const [singleCoin, setSingleCoin] = useState();

  function fetchSingleCoin() {
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then((res) => {
      setSingleCoin(res.data);
    });
  }

  useEffect(() => {
    fetchSingleCoin();
  }, []);

  return (
    <div className="coinContainer">
      <div className="sideBar">
        <img
          src={singleCoin?.image.large}
          alt={singleCoin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Heading className="coin-name">{singleCoin?.name}</Heading>
        <div
          style={{
            width: "100%",
            padding: "10px",
            paddingBottom: "10px",
            textAlign: "justify",
          }}
        >
          <Text className="description">
            {singleCoin?.description.en.split(". ")[0]}
          </Text>
        </div>
        <div className="marketData">
          <span className="market" style={{ display: "flex" }}>
            Rank: {numberWithCommas(+singleCoin?.market_cap_rank)}
          </span>
        </div>
        <div className="marketData">
          <span className="market" style={{ display: "flex" }}>
            Current Price: {symbol}{" "}
            {numberWithCommas(
              +singleCoin?.market_data.current_price[currency.toLowerCase()]
            )}
          </span>
          <div className="marketData">
            <span className="market" style={{ display: "flex" }}>
              Market Cap: {symbol}{" "}
              {numberWithCommas(
                +singleCoin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="coin-cht">
        {/* CoinChart */}
        <CoinChart coin={singleCoin} />
      </div>
    </div>
  );
}

export default CoinDetail;
