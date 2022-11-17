import { IonContent, IonImg, IonPage } from "@ionic/react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Primary, Thrid, White } from "../components/color";
import "@fontsource/poppins";
import HomeComponent from "../components/HomeComponent";
import RiwayatComponent from "../components/RiwayatComponent";
import AkunComponent from "../components/AkunComponent";
import InfoAkunComponent from "../components/InfoAkunComponent";
import EditAkunComponent from "../components/EditAkunComponent";
import { Get } from "../components/Storage";
import { useEffect, useState } from "react";
import { ArrowBackIos } from "@mui/icons-material";

const fontFamily = "Poppins";

interface componentProps {
  no: number;
}

const Main: React.FC<componentProps> = ({ no }) => {
  const [role, setRole] = useState(0);

  useEffect(() => {
    Get("role").then((role) => setRole(role));
  }, []);

  const Componenet = () => {
    if (no === 1) {
      return <HomeComponent />;
    } else if (no === 2) {
      return <RiwayatComponent />;
    } else if (no === 4) {
      return <InfoAkunComponent />;
    } else if (no === 5) {
      return <EditAkunComponent />;
    }
    return <AkunComponent />;
  };

  return (
    <IonPage>
      <IonContent>
        <Box
          sx={{ background: Primary, position: "fixed", top: 0, width: "100%" }}
        >
          <Box
            display="flex"
            justifyContent="space-evenly"
            sx={{ mx: "10%", py: "2%" }}
          >
            {no > 3 ? (
              <IconButton onClick={() => window.history.back()}>
                <ArrowBackIos
                  fontSize="small"
                  sx={{ fill: Primary, background: White }}
                />
              </IconButton>
            ) : (
              ""
            )}

            <Typography
              sx={{
                color: White,
                fontWeight: 600,
                fontSize: 25,
                fontFamily,
              }}
            >
              {no === 1 ? "Beranda" : ""}
              {no === 2 ? "Riwayat" : ""}
              {no === 3 ? "Akun" : ""}
              {no >= 4
                ? role === 1
                  ? "Informasi Pasien"
                  : "Informasi Nakes"
                : ""}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: "17%", mb: "25%" }}>
          <Componenet />
        </Box>

        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            background: Primary,
            width: "100%",
          }}
        >
          <Box display="flex" justifyContent="space-around">
            <Button
              sx={{ width: "100%", background: no === 1 ? Thrid : "" }}
              href={no === 1 ? "" : "/home"}
            >
              <Box>
                <IonImg src="assets/icon/SOS.svg"></IonImg>
                <Typography sx={{ fontFamily, fontSize: 16, color: White }}>
                  SOS
                </Typography>
              </Box>
            </Button>

            <Button
              sx={{ width: "100%", background: no === 2 ? Thrid : "" }}
              href={no === 2 ? "" : "/riwayat"}
            >
              <Box>
                <IonImg src="assets/icon/Riwayat.svg"></IonImg>
                <Typography sx={{ fontFamily, fontSize: 16, color: White }}>
                  Riwayat
                </Typography>
              </Box>
            </Button>

            <Button
              sx={{ width: "100%", background: no >= 3 ? Thrid : "" }}
              href={no >= 3 ? "" : "/akun"}
            >
              <Box>
                <IonImg src="assets/icon/Akun.svg"></IonImg>
                <Typography sx={{ fontFamily, fontSize: 16, color: White }}>
                  Akun
                </Typography>
              </Box>
            </Button>
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default Main;
