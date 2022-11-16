import "@fontsource/poppins";
import { Box, Card, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Thrid, White } from "./color";
import { Server } from "./server";
import { Get } from "./Storage";

const fontFamily = "Poppins";

const RiwayatComponent: React.FC = () => {
  const [data, setData] = useState([{ kamar: "", tanggal: 0 }]);
  const [username, setUsername] = useState("");
  const [penyakit, setPenyakit] = useState("");

  const date = (date: number) => {
    let tgl = new Date(date);
    return `${tgl.getDate()}-${tgl.getMonth()}-${tgl.getFullYear()} : ${tgl.getHours()}.${tgl.getMinutes()}`;
  };

  useEffect(() => {
    Get("token").then((token) => {
      Get("username").then((username) => {
        setUsername(username);

        axios
          .get(`${Server}/user/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => setPenyakit(res.data.data.penyakit));

        axios
          .get(`${Server}/history/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => setData(res.data.data));
      });
    });
  }, []);

  return (
    <Box>
      {data.map((val, i) => (
        <Card
          sx={{ background: Thrid, mx: "10%", mt: "7%", borderRadius: 1.5 }}
        >
          <Box sx={{ mx: "5%", py: "5%" }}>
            <Typography sx={{ fontFamily, fontWeight: 600, color: White }}>
              {username} {date(val.tanggal)}
            </Typography>

            <Typography sx={{ fontFamily, color: White }}>
              Kamar {val.kamar}
            </Typography>

            <Typography sx={{ fontFamily, color: White }}>
              Panyakit {penyakit}
            </Typography>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default RiwayatComponent;
