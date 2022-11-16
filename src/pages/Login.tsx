import { IonContent, IonImg, IonPage, IonRedirect } from "@ionic/react";
import { Box } from "@mui/system";
import "@fontsource/poppins";
import { Alert, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Primary, Secondary, White } from "../components/color";
import axios from "axios";
import { Create, Get } from "../components/Storage";
import { Server } from "../components/server";

const fontFamily = "Poppins";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(true);

  const onSubmit = () => {
    axios
      .post(`${Server}/auth/login`, { username, password })
      .then(async (res) => {
        setStatus(true);
        await Create("token", res.data.token);
        await Create("username", res.data.user.username);
        await Create("role", res.data.user.role);
        window.location.assign("/home");
        // console.log(res.data);
      })
      .catch((e) => {
        const res = e.response.data;
        setStatus(res.status);
        setMessage(res.message);
      });
  };

  useEffect(() => {
    Get("token").then((val) => (val ? window.location.assign("/home") : ""));
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <Box sx={{ background: Primary, height: "100vh" }}>
          <Box sx={{ mx: "auto", width: "50%", pt: "7%" }}>
            <IonImg src="assets/gambar depan.svg" alt="gambar awal"></IonImg>
          </Box>

          <Box
            sx={{
              background: White,
              borderTopRightRadius: 50,
              borderTopLeftRadius: 50,
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "68%",
            }}
          >
            <Typography
              sx={{
                fontSize: 25,
                color: Primary,
                mx: "auto",
                width: "max-content",
                py: "5%",
                fontFamily,
              }}
            >
              Silahkan Masuk Dahulu !
            </Typography>

            <form>
              <Box sx={{ mx: "10%" }}>
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

                <Typography
                  sx={{
                    fontSize: 20,
                    color: Primary,
                    width: "max-content",
                    fontFamily,
                  }}
                >
                  Username
                </Typography>

                <TextField
                  fullWidth
                  name="username"
                  sx={{
                    background: Primary,
                    borderRadius: 1.5,
                    my: "2%",
                    input: {
                      color: White,
                      borderRadius: 1.5,
                      fontSize: 20,
                      fontFamily,
                    },
                  }}
                  placeholder="Masukkan username anda"
                  onChange={(e) => setUsername(e.target.value)}
                />

                <Typography
                  sx={{
                    fontSize: 20,
                    color: Primary,
                    width: "max-content",
                    fontFamily,
                  }}
                >
                  Password
                </Typography>

                <TextField
                  fullWidth
                  name="password"
                  type="password"
                  placeholder="Masukkan password anda"
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    background: Primary,
                    my: "2%",
                    borderRadius: 1.5,
                    fontFamily,
                    input: {
                      color: White,
                      borderRadius: 1.5,
                      fontSize: 20,
                      fontFamily,
                    },
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 15,
                    color: Primary,
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  Lupa password ?
                </Typography>

                <Button
                  sx={{
                    fontFamily,
                    background: Secondary,
                    color: White,
                    fontSize: 20,
                    mx: "auto",
                    my: "5%",
                    px: 3,
                    borderRadius: 1.5,
                    display: "flex",
                    justifyContent: "center",
                  }}
                  onClick={onSubmit}
                >
                  Masuk
                </Button>
              </Box>
            </form>

            <Box
              sx={{
                mx: "auto",
                width: "max-content",
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontSize: 15,
                  color: Secondary,
                }}
              >
                {"Belum memiliki akun? "}
              </Typography>

              <Typography
                component="span"
                sx={{
                  fontSize: 15,
                  color: Primary,
                }}
              >
                Daftar disini
              </Typography>
            </Box>
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default Login;
