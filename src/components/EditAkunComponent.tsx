import "@fontsource/poppins";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Primary, Secondary, White } from "./color";
import { Server } from "./server";
import { Get } from "./Storage";
import { Plugins, Capacitor } from "@capacitor/core";

const fontFamily = "Poppins";

const EditAkunComponent: React.FC = () => {
  const [role, setRole] = useState(0);
  const [no, setNo] = useState("");
  const [nama, setNama] = useState("");
  const [usia, setUsia] = useState(0);
  const [kamar, setKamar] = useState("");
  const [penyakit, setPenyakit] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = () => {
    const data =
      role === 1
        ? { no, nama, usia, kamar, penyakit, role }
        : { no, nama, role };
    axios
      .patch(`${Server}/user/${no}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => window.location.assign("/akun"))
      .catch((e) => {
        const data = e.respone.data.data;
        setMessage(data.message);
        setStatus(data.status);
      });
  };

  useEffect(() => {
    Get("role").then((role) => {
      setRole(role);
      Get("token").then((token) => {
        if (!token) return window.location.assign("/");
        setToken(token);

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

    if (Capacitor.isNative) {
      Plugins.App.addListener("backButton", (e: any) => {
        window.history.back();
      });
    }
  }, []);

  return (
    <Box sx={{ mx: "10%" }}>
      <Alert
        severity="error"
        sx={{
          fontFamily,
          fontSize: 20,
          display: !status ? "none" : "fixed",
          mt: "5%",
          mb: "2%",
        }}
      >
        {message}
      </Alert>

      <Typography
        sx={{ fontFamily, color: Primary, fontSize: 20, mt: "5%", mb: "2%" }}
      >
        {role === 1 ? "Nomor Rekammedik" : "Nomor Nakes"}
      </Typography>

      <TextField
        value={no}
        fullWidth
        sx={{
          fontFamily,
          background: Primary,
          fontSize: 20,
          color: White,
          px: "3%",
          borderRadius: 1.5,
          input: { color: White, fontSize: 20, borderRadius: 1.5 },
        }}
      />

      <Typography
        sx={{ fontFamily, color: Primary, fontSize: 20, mt: "5%", mb: "2%" }}
      >
        Nama {role === 1 ? "Pasien" : "Nakes"}
      </Typography>

      <TextField
        value={nama}
        fullWidth
        sx={{
          fontFamily,
          background: Primary,
          fontSize: 20,
          color: White,
          px: "3%",
          borderRadius: 1.5,
          input: { color: White, fontSize: 20, borderRadius: 1.5 },
        }}
        onChange={(e) => setNama(e.target.value)}
      />

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

          <TextField
            value={usia}
            fullWidth
            sx={{
              fontFamily,
              background: Primary,
              fontSize: 20,
              color: White,
              px: "3%",
              borderRadius: 1.5,
              input: { color: White, fontSize: 20, borderRadius: 1.5 },
            }}
            onChange={(e) => setUsia(parseInt(e.target.value))}
          />

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

          <TextField
            value={kamar}
            fullWidth
            sx={{
              fontFamily,
              background: Primary,
              fontSize: 20,
              color: White,
              px: "3%",
              borderRadius: 1.5,
              input: { color: White, fontSize: 20, borderRadius: 1.5 },
            }}
            onChange={(e) => setKamar(e.target.value)}
          />

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

          <TextField
            value={penyakit}
            fullWidth
            sx={{
              fontFamily,
              background: Primary,
              fontSize: 20,
              color: White,
              px: "3%",
              borderRadius: 1.5,
              input: { color: White, fontSize: 20, borderRadius: 1.5 },
            }}
            onChange={(e) => setPenyakit(e.target.value)}
          />
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
          onClick={onSubmit}
        >
          Edit
        </Button>
      </Box>
    </Box>
  );
};

export default EditAkunComponent;
