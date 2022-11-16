import { Box, Button } from "@mui/material";
import { White, Primary } from "./color";

interface ContainerProps {
  link: string;
  login: boolean;
}

const SplashButton: React.FC<ContainerProps> = ({ link, login }) => {
  const pasien: string = `/${link}/pasien`;
  const nakes: string = `/${link}/nakes`;

  return (
    <Box display="flex" flexDirection="column" sx={{ mx: "auto", width: 150 }}>
      <Button
        href={login ? "/login" : pasien}
        sx={{ background: White, color: Primary }}
      >
        Pasien
      </Button>
      <Button
        href={login ? "/login" : nakes}
        sx={{ background: White, color: Primary }}
      >
        Nakes
      </Button>
    </Box>
  );
};

export default SplashButton;
