import "@fontsource/poppins";
import { IonImg } from "@ionic/react";
import { Box, Button, Typography } from "@mui/material";
import { Primary, Thrid, White } from "./color";

const fontFamily = "Poppins";

const EditKamarComponent: React.FC = () => {
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
            nama pasien
          </Typography>

          <Typography sx={{ color: Primary, fontFamily, fontSize: 20 }}>
            nomor rmd
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mx: "2%" }}>
        <Button
          fullWidth
          sx={{
            background: Thrid,
            fontFamily,
            fontSize: 20,
            color: White,
            my: "3%",
          }}
        >
          Informasi Pasien
        </Button>

        <br />

        <Button
          fullWidth
          sx={{
            background: Thrid,
            fontFamily,
            fontSize: 20,
            color: White,
            my: "3%",
          }}
        >
          Informasi Pasien
        </Button>
      </Box>
    </Box>
  );
};

export default EditKamarComponent;
