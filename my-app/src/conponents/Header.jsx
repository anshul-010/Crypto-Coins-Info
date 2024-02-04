import React, { useContext } from "react";
import "../Styles/Header.css";
import { Container, Heading } from "@chakra-ui/react";
import { AppContext } from "../Context/ContextProvider";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { currency, setCurrency, login, setLogin } = useContext(AppContext);
  const navigate = useNavigate();
  function handleLogin() {
    navigate("/login");
  }
  return (
    <div id="main">
      <Container className="navbar">
        <Link to="/">
          <Heading>Traders</Heading>
        </Link>
      </Container>
      <Container>
        <select
          name=""
          id="selet_currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="INR">₹ INR</option>
          <option value="USD">$ USD</option>
        </select>
      </Container>
      <div onClick={handleLogin}>
        {!login ? (
          <button className="log-btn">Login</button>
        ) : (
          <button className="log-btn" onClick={() => setLogin(false)}>
            Log out
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
