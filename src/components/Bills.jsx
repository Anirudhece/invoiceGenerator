import React, { useState } from "react";
import { Container, Typography, Box, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WifiProtectedSetupIcon from "@mui/icons-material/WifiProtectedSetup";
import Divider from "@mui/material/Divider";
const Bills = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Container sx={{ backgroundColor: "white", marginTop: "10px" }}>
      <Typography align="center">LIST OF INVOICES</Typography>
      <Box
        className="horizontal"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          backgroundColor: isHovered ? "rgba(0,0,0,.07)" : "inherit",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          className="leftSide"
          sx={{ padding: "10px" }}
        >
          <Box>
            <Typography m="2">🧾</Typography>
          </Box>
          <Box textAlign="center" sx={{ marginLeft: "15px" }}>
            <Typography>Bill to</Typography>
            <Typography size="large">date of bill</Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" className="rightSide">
          <Tooltip title="Delete">
            <IconButton aria-label="delete" sx={{ marginRight: "5px" }}>
              <DeleteIcon fontSize="large" color="warning" />
            </IconButton>
          </Tooltip>
          <Tooltip title="view">
            <IconButton aria-label="view" sx={{ marginRight: "5px" }}>
              <VisibilityIcon fontSize="large" color="info" />
            </IconButton>
          </Tooltip>
          <Tooltip title="edit">
            <IconButton aria-label="edit" sx={{ marginRight: "5px" }}>
              <WifiProtectedSetupIcon fontSize="large" color="secondary" />
            </IconButton>
          </Tooltip>
          <Typography textAlign="center" sx={{ marginRight: "15px" }}>
            bill amount
          </Typography>
        </Box>
      </Box>

      <Divider />
    </Container>
  );
};
export default Bills;
