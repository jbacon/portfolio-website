import { Box, Button, Typography } from "@mui/material";

const FourOhFour = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "50vh",
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h6">
        Oops, the page you’re looking for doesn’t exist.
      </Typography>
      <Button variant="outlined" href="/">
        Back Home
      </Button>
    </Box>
  );
};

export default FourOhFour;
