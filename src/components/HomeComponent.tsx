import { Box, IconButton, Typography } from "@mui/material";
import { Green, Primary, Red, Thrid, White } from "./color";
import "@fontsource/poppins";
import { useEffect, useState } from "react";
import axios from "axios";
import { Server } from "./server";
import { Clear, Get } from "./Storage";
import { IonImg } from "@ionic/react";

const fontFamily = "Poppins";

const HomeComponent: React.FC = () => {
  const [data, setData] = useState({ username: "", id: "", role: 0 });
  const [token, setToken] = useState("");
  const [alarm, setAlarm] = useState(0);

  const daruratAction = () => {
    axios
      .patch(
        `${Server}/panic/${data.username}`,
        { status: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => console.log(res))
      .catch((e) => console.log(e.response.data));
  };

  useEffect(() => {
    Get("token").then((val) => {
      setToken(val);
      axios
        .get(`${Server}/auth/akun`, {
          headers: { Authorization: `Bearer ${val}` },
        })
        .then((res) => setData(res.data))
        .catch((e) => {
          Clear();
          return e.response.status === 401 ? window.location.assign("/") : "";
        });
    });

    setInterval(() => {
      axios
        .get(`${Server}/panic`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setAlarm(res.data.data.status));
    }, 1000);
  }, []);

  return (
    <Box>
      <Box sx={{ background: Thrid }}>
        <Box sx={{ mx: "10%" }}>
          <Typography
            sx={{
              fontFamily,
              color: White,
              fontSize: 16,
              textAlign: "center",
              py: "2%",
            }}
          >
            Silahkan tekan tombol darurat jika terjadi sesuatu !
          </Typography>
        </Box>
      </Box>

      <Typography
        sx={{
          fontSize: 20,
          fontFamily,
          color: Primary,
          textAlign: "center",
          my: "3%",
        }}
      >
        Hi {data.username} !!!
      </Typography>

      <Box sx={{ width: "60%", mx: "auto", my: "2%" }}>
        <IconButton
          onClick={daruratAction}
          disabled={alarm === 1 ? true : false}
        >
          <IonImg src="/assets/button.svg"></IonImg>
        </IconButton>
      </Box>

      <Typography
        sx={{
          color: Primary,
          fontSize: 16,
          textAlign: "center",
          fontFamily,
          my: "3%",
          mx: "10%",
        }}
      >
        Tekan tombol diatas apabila terjadi sesuatu di area anda !
      </Typography>

      <Typography
        sx={{
          color: Primary,
          fontSize: 16,
          textAlign: "center",
          fontFamily,
          my: "3%",
          mx: "10%",
        }}
      >
        Status Alarm
      </Typography>

      <Box
        sx={{
          background: alarm === 1 ? Green : Red,
          width: "30%",
          mx: "auto",
          py: "3%",
          borderRadius: 10,
        }}
      >
        <Typography
          sx={{ fontFamily, color: White, fontSize: 16, textAlign: "center" }}
        >
          {alarm === 1 ? "Aktif" : "Tidak Aktif"}
        </Typography>
      </Box>
    </Box>
  );
};

export default HomeComponent;
