import "@fontsource/poppins";
import { IonImg } from "@ionic/react";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Primary, Red, Thrid, White } from "./color";
import { Server } from "./server";
import { Clear, Get } from "./Storage";

const fontFamily = "Poppins";

const AkunComponent: React.FC = () => {
  const [data, setData] = useState({
    nama: "",
    no_nakes: "",
    no_rmd: "",
  });
  const [role, setRole] = useState(0);

  useEffect(() => {
    Get("token").then((token) => {
      if (!token) return window.location.assign("/");

      Get("username").then((username) => {
        axios
          .get(`${Server}/user/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setData(res.data.data);
            Get("role").then((role) => setRole(role));
          });
      });
    });
  }, []);

  return (
    <Box>
      <Box
        sx={{ mx: "10%", my: "10%" }}
        display="flex"
        justifyContent="space-evenly"
      >
        <Box sx={{ background: Primary, borderRadius: 100, width: "30%" }}>
          <IonImg src="assets/icon/profil.svg"></IonImg>
        </Box>

        <Box
          display="flex"
          justifyContent="space-around"
          flexDirection="column"
        >
          <Typography
            sx={{ color: Primary, fontFamily, fontSize: 20, fontWeight: 600 }}
          >
            {data.nama}
          </Typography>

          <Typography sx={{ color: Primary, fontFamily, fontSize: 20 }}>
            {role === 2 ? data.no_nakes : data.no_rmd}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mx: "2%" }}>
        <Button
          fullWidth
          href="/akun/informasi"
          sx={{
            background: Thrid,
            fontFamily,
            fontSize: 20,
            color: White,
            my: "3%",
          }}
        >
          Informasi {role === 1 ? "Pasien" : "Nakes"}
        </Button>

        <br />

        <Button
          fullWidth
          sx={{
            background: Red,
            fontFamily,
            fontSize: 20,
            color: White,
            my: "3%",
          }}
          onClick={async () => {
            await Clear();
            window.location.assign("/");
          }}
        >
          logout
        </Button>
      </Box>
    </Box>
  );
};

export default AkunComponent;
