import { IonContent, IonPage, IonImg } from "@ionic/react";
import { Box, Button, Typography } from "@mui/material";
import { Primary, Secondary } from "../components/color";
import { KeyboardArrowDown } from "@mui/icons-material";
import "@fontsource/poppins";
import SplashButton from "../components/SplashButton";
import { useEffect, useState } from "react";
import { Get } from "../components/Storage";

const Splash: React.FC = () => {
  const [masuk, setMasuk] = useState(false);
  const [daftar, setDaftar] = useState(false);

  const masukAction = () => {
    setMasuk(!masuk);
    setDaftar(false);
  };

  const daftarAction = () => {
    setDaftar(!daftar);
    setMasuk(false);
  };

  useEffect(() => {
    Get("token").then((val) => (val ? window.location.assign("/home") : ""));
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <Box sx={{ background: Primary, height: "100vh" }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              color: Secondary,
              fontSize: 30,
              fontWeight: 600,
              mx: "10%",
              py: "5%",
            }}
          >
            Selamat Datang di Aplikasi Darurat Pasien
          </Typography>

          <Box sx={{ mx: "auto", width: 280 }}>
            <IonImg src="assets/gambar depan.svg" alt="gambar awal"></IonImg>
          </Box>

          <Box
            sx={{ pt: "10%", height: "25%", width: "max-content", mx: "auto" }}
          >
            <Button
              variant="contained"
              sx={{
                background: Secondary,
                color: Primary,
                fontFamily: "Poppins",
                fontSize: 20,
                width: 150,
              }}
              endIcon={<KeyboardArrowDown />}
              onClick={masukAction}
            >
              Masuk
            </Button>

            <Box sx={{ display: masuk ? "fixed" : "none" }}>
              <SplashButton link="login" login={true} />
            </Box>

            <br />

            <Button
              variant="outlined"
              sx={{
                color: Secondary,
                fontFamily: "Poppins",
                fontSize: 20,
                width: 150,
                mt: masuk ? 0 : 6,
              }}
              endIcon={<KeyboardArrowDown />}
              onClick={daftarAction}
            >
              Daftar
            </Button>

            <Box sx={{ display: daftar ? "fixed" : "none" }}>
              <SplashButton link="register" login={false} />
            </Box>
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default Splash;
