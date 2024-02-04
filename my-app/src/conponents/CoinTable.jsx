import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/ContextProvider";
import {
  Heading,
  Box,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Spinner,
  Tr,
  Th,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const CoinTable = () => {
  const { currency, symbol } = useContext(AppContext);
  const [Coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  function fetchCoinData(currency) {
    setLoading(true);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`
      )
      .then((res) => {
        setCoins(res.data);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchCoinData(currency);
  }, [currency, page]);

  function handleSearch() {
    return Coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  }
  let Paginate = new Array(10).fill(0);
  return (
    <div
      style={{
        backgroundColor: "gray",
        textAlign: "center",
        color: "white",
        fontFamily: "Montserrat",
      }}
    >
      <Box>
        <Heading
          style={{ padding: "20px", color: "white", fontFamily: "serif" }}
        >
          Cryptocurrency Prices by Market Cap
        </Heading>
      </Box>
      <Box>
        <input
          type="text"
          placeholder="Search"
          style={{
            width: "90%",
            height: "50px",
            fontSize: "30px",
            color: "gray",
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <Box size="100">
        <TableContainer>
          {loading ? (
            <Spinner
              style={{ height: "200px", width: "200px", color: "goldenrod" }}
            />
          ) : (
            <div style={{ margin: "auto", width: "90%" }}>
              <Table style={{ width: "100%" }}>
                <Thead style={{ backgroundColor: "#EEBC1D" }}>
                  <Tr>
                    <Th style={{ padding: "10px", width: "20%" }}>Coin</Th>
                    <Th style={{ padding: "10px", width: "20%" }}>Price</Th>
                    <Th style={{ padding: "10px", width: "20%" }}>
                      Change in 24h
                    </Th>
                    <Th style={{ padding: "10px", width: "20%" }}>
                      Market Cap
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h >= 0;
                      return (
                        <Tr key={row.name}>
                          <Th style={{ display: "flex", gap: "15" }}>
                            <Link to={`/coin/${row.id}`}>
                              <img
                                src={row?.image}
                                alt={row.name}
                                height="50"
                                style={{ marginBottom: 10, marginRight: 10 }}
                              />
                            </Link>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span style={{ color: "darkgrey" }}>
                                {row.name}
                              </span>
                            </div>
                          </Th>
                          <Th align="right">
                            {symbol}{" "}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </Th>
                          <Th
                            align="right"
                            style={{
                              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                              fontWeight: 500,
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </Th>
                          <Th align="right">
                            {symbol}{" "}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}
                            M
                          </Th>
                        </Tr>
                      );
                    })}
                </Tbody>
              </Table>
            </div>
          )}
        </TableContainer>
      </Box>
      <Box padding="15px">
        {Paginate.map((_, i) => (
          <Button
            disabled={page == i + 1}
            key={i}
            style={{
              padding: 5,
              margin: 4,
              fontSize: "large",
              backgroundColor: "gray",
              color: "white",
              borderRadius: "50%",
              border: "none",
            }}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
      </Box>
    </div>
  );
};

export default CoinTable;
