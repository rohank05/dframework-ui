import React from 'react'
import { Grid, Typography } from "@mui/material";

const CustomLoader = () => {

  const gridStyle = {
    width: "60vw",
    height: "60vw",
    border: "2px dotted lightgray",
    borderRadius: "50%",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translateX(-50%) translateY(-50%)",
  };
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={gridStyle}
    >

      <Typography
        variant="body2"
        id="footer"
        color="text.secondary"
        align="center"
        sx={{
          mt: 14,
          mb: 2,
          position: "fixed",
          top: 280,
          left: 0,
          bottom: 0,
          width: "100%",
          textAlign: "center",
          fontWeight: 400,
        }}
      >
        Loading...
      </Typography>
    </Grid>
  );
};
export default CustomLoader;
