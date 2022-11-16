import "@fontsource/poppins";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Primary, Secondary, White } from "./color";
import { Server } from "./server";
import { Get } from "./Storage";

const fontFamily = "Poppins";

const InfoAkunComponent: React.FC = () => {
  const [role, setRole] = useState(0);
  const [no, setNo] = useState(0);
  const [nama, setNama] = useState(0);
  const [usia, setUsia] = useState(0);
  const [kamar, setKamar] = useState(0);
  const [penyakit, setPenyakit] = useState(0);

  useEffect(() => {
    Get("role").then((role) => {
      setRole(role);

      Get("token").then((token) => {
        Get("username").then((username) => {
          axios
            .get(`${Server}/user/${username}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
              const data = res.data.data;
              setNo(role === 1 ? data.no_rmd : data.no_nakes);
              setNama(data.nama);
              setUsia(data.usia);
              setPenyakit(data.penyakit);
              setKamar(data.kamar);
            });
        });
      });
    });
  }, []);

  return (
    <Box sx={{ mx: "10%" }}>
      <Typography
        sx={{ fontFamily, color: Primary, fontSize: 20, mt: "5%", mb: "2%" }}
      >
        {role === 1 ? "Nomor Rekammedik" : "Nomor Nakes"}
      </Typography>

      <Typography
        sx={{
          fontFamily,
          background: Primary,
          fontSize: 20,
          color: White,
          px: "3%",
          py: "5%",
          borderRadius: 1.5,
        }}
      >
        {no}
      </Typography>

      <Typography
        sx={{ fontFamily, color: Primary, fontSize: 20, mt: "5%", mb: "2%" }}
      >
        Nama {role === 1 ? "Pasien" : "Nakes"}
      </Typography>

      <Typography
        sx={{
          fontFamily,
          background: Primary,
          fontSize: 20,
          color: White,
          px: "3%",
          py: "5%",
          borderRadius: 1.5,
        }}
      >
        {nama}
      </Typography>

      {role === 1 ? (
        <Box>
          <Typography
            sx={{
              fontFamily,
              color: Primary,
              fontSize: 20,
              mt: "5%",
              mb: "2%",
            }}
          >
            Usia
          </Typography>

          <Typography
            sx={{
              fontFamily,
              background: Primary,
              fontSize: 20,
              color: White,
              px: "3%",
              py: "5%",
              borderRadius: 1.5,
            }}
          >
            {usia}
          </Typography>

          <Typography
            sx={{
              fontFamily,
              color: Primary,
              fontSize: 20,
              mt: "5%",
              mb: "2%",
            }}
          >
            Kamar Pasien
          </Typography>

          <Typography
            sx={{
              fontFamily,
              background: Primary,
              fontSize: 20,
              color: White,
              px: "3%",
              py: "5%",
              borderRadius: 1.5,
            }}
          >
            {kamar}
          </Typography>

          <Typography
            sx={{
              fontFamily,
              color: Primary,
              fontSize: 20,
              mt: "5%",
              mb: "2%",
            }}
          >
            Penyakit yang Diderita
          </Typography>

          <Typography
            sx={{
              fontFamily,
              background: Primary,
              fontSize: 20,
              color: White,
              px: "3%",
              py: "5%",
              borderRadius: 1.5,
            }}
          >
            {penyakit}
          </Typography>
        </Box>
      ) : (
        ""
      )}

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          sx={{
            background: Secondary,
            color: White,
            px: "10%",
            fontFamily,
            fontSize: 16,
            my: "10%",
          }}
          href="/akun/informasi/edit"
        >
          Edit
        </Button>
      </Box>
    </Box>
  );
};

export default InfoAkunComponent;
