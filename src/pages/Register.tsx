import { IonContent, IonPage } from "@ionic/react";
import {
  Alert,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Primary, Secondary, White } from "../components/color";
import "@fontsource/poppins";
import { useEffect, useState } from "react";
import { ArrowBackIos } from "@mui/icons-material";
import axios from "axios";
import { Server } from "../components/server";
import { Get } from "../components/Storage";

interface componentProps {
  nakes: boolean;
}

const fontFamily = "Poppins";

const Register: React.FC<componentProps> = ({ nakes }) => {
  const [username, setUsername] = useState("");
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [usia, setUsia] = useState(0);
  const [kamar, setKamar] = useState("");
  const [penyakit, setPenyakit] = useState("");

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(true);

  const data = nakes
    ? { username, nama, password, role: 2 }
    : { username, nama, password, usia, kamar, role: 1, penyakit };

  const onSubmit = () => {
    axios
      .post(`${Server}/auth/register`, data)
      .then((res) => window.location.assign("/login"))
      .catch((e) => {
        setStatus(e.response.data.status);
        setMessage(e.response.data.message);
      });
  };

  useEffect(() => {
    Get("token").then((val) => (val ? window.location.assign("/home") : ""));
  }, []);

  return (
    <IonPage>
      <IonContent>
        <Box sx={{ mx: "10%", mt: "2%" }}>
          <Box display="flex" justifyContent="space-evenly">
            <IconButton onClick={() => window.history.back()}>
              <ArrowBackIos
                fontSize="small"
                sx={{ fill: White, background: Primary }}
              />
            </IconButton>

            <Typography
              sx={{
                fontSize: 25,
                color: Primary,
                fontFamily,
                fontWeight: 600,
                width: "max-content",
                mx: "auto",
              }}
            >
              Registrasi {nakes ? "Nake" : "Pasien"}
            </Typography>
          </Box>

          <Alert
            severity="error"
            sx={{
              fontFamily,
              fontSize: 15,
              display: status ? "none" : "fixed",
            }}
          >
            {message}
          </Alert>

          <Typography sx={{ color: Primary, fontSize: 20 }}>
            {nakes ? "Nomor Nakes" : "Nomor Rekammedik"}
          </Typography>

          <TextField
            placeholder={
              nakes
                ? "Masukkan nomor nakes anda"
                : "Masukkan nomor rekammedik anda"
            }
            sx={{
              background: Primary,
              input: { color: White, borderRadius: 1.5, fontSize: 20 },
              borderRadius: 1.5,
              my: "2%",
            }}
            fullWidth
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <Typography sx={{ color: Primary, fontSize: 20 }}>
            {nakes ? "Nama Nakes" : "Nama Pasien"}
          </Typography>

          <TextField
            placeholder="Masukkan nama lengkap anda"
            sx={{
              background: Primary,
              input: { color: White, borderRadius: 1.5, fontSize: 20 },
              borderRadius: 1.5,
              my: "2%",
            }}
            fullWidth
            name="nama"
            onChange={(e) => setNama(e.target.value)}
          />

          <Typography
            sx={{
              color: Primary,
              fontSize: 20,
              display: nakes ? "none" : "fixed",
            }}
          >
            Usia Pasien
          </Typography>

          <TextField
            placeholder="Masukkan usia anda"
            sx={{
              background: Primary,
              input: { color: White, borderRadius: 1.5, fontSize: 20 },
              borderRadius: 1.5,
              my: "2%",
              display: nakes ? "none" : "fixed",
            }}
            fullWidth
            name="usia"
            onChange={(e) => setUsia(parseInt(e.target.value))}
          />

          <Typography
            sx={{
              color: Primary,
              fontSize: 20,
              display: nakes ? "none" : "fixed",
            }}
          >
            Kamar Pasien
          </Typography>

          <TextField
            placeholder="Masukkan kamar anda"
            sx={{
              background: Primary,
              input: { color: White, borderRadius: 1.5, fontSize: 20 },
              borderRadius: 1.5,
              my: "2%",
              display: nakes ? "none" : "fixed",
            }}
            fullWidth
            name="kamar"
            onChange={(e) => setKamar(e.target.value)}
          />

          <Typography
            sx={{
              color: Primary,
              display: nakes ? "none" : "fixed",
              fontSize: 20,
            }}
          >
            Penyakit yang Diderita
          </Typography>

          <TextField
            placeholder="Masukkan penyakit anda"
            sx={{
              background: Primary,
              input: { color: White, borderRadius: 1.5, fontSize: 20 },
              borderRadius: 1.5,
              my: "2%",
              display: nakes ? "none" : "fixed",
            }}
            fullWidth
            name="penyakit"
            onChange={(e) => setPenyakit(e.target.value)}
          />

          <Typography sx={{ color: Primary, fontSize: 20 }}>
            Password
          </Typography>

          <TextField
            placeholder="Masukkan password anda"
            sx={{
              background: Primary,
              input: { color: White, borderRadius: 1.5, fontSize: 20 },
              borderRadius: 1.5,
              my: "2%",
            }}
            fullWidth
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Typography sx={{ color: Primary, fontSize: 20 }}>
            Konfirmasi Password
          </Typography>

          <TextField
            placeholder="Masukkan password anda"
            sx={{
              background: Primary,
              input: { color: White, borderRadius: 1.5, fontSize: 20 },
              borderRadius: 1.5,
              my: "2%",
            }}
            fullWidth
            name="repassword"
            type="password"
            onChange={(e) => setRePassword(e.target.value)}
          />

          <Button
            sx={{
              background: Secondary,
              fontSize: 20,
              color: White,
              px: "10%",
              mx: "auto",
              my: "10%",
              display: "flex",
              flexDirection: "center",
            }}
            onClick={onSubmit}
            disabled={rePassword === password ? false : true}
          >
            Register
          </Button>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default Register;
