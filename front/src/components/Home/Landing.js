import BuyCard from "./BuyCard";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link as Scroll } from "react-scroll";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CssBaseline } from "@mui/material";

function Landing() {
  let navigate = useNavigate();

  const goToAuctions = () => {
    navigate("/auctions");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const kind = [
    {
      title: "Sell",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
      imageUrl: "https://localhost:33123/images/kobuR.jpg",
      time: 1500,
    },
    {
      title: "Buy",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
      imageUrl: "https://localhost:33123/images/saadR.jpg",
      time: 1500,
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `url("https://localhost:33123/images/products.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <CssBaseline />
      <motion.div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "Futura",
        }}
        id="header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <AppBar style={{ background: "none" }} elevation={0}>
          <Toolbar style={{ width: "80%", margin: "0 auto" }}>
            <h1 style={{ flexGrow: "1", fontSize: "2.6rem", color: "#fff" }}>
              Auction
            </h1>
            <IconButton onClick={goToLogin}>
              <ExitToAppIcon style={{ color: "#fff", fontSize: "2rem" }} />
            </IconButton>
          </Toolbar>
        </AppBar>

        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              flexGrow: "1",
              fontSize: "4.5rem",
              background:
                "-webkit-linear-gradient(45deg, #00C9FF 0%, #92FE9D 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <div style={{ color: "#fff", fontSize: "4.5rem" }}>
              <br />
            </div>
            <div style={{ color: "#fff", fontSize: "4.5rem" }}>
              <br />
            </div>
          </h1>

          <Scroll to="DOWN" smooth={true}>
            <IconButton>
              <ExpandMoreIcon style={{ color: "#fff", fontSize: "4rem" }} />
            </IconButton>
          </Scroll>
        </div>
      </motion.div>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        id="DOWN"
      >
        <div onClick={goToAuctions}>
          <BuyCard kind={kind[1]} />
        </div>
        <div onClick={goToLogin}>
          <BuyCard kind={kind[0]} />
        </div>
      </div>
    </div>
  );
}

export default Landing;
