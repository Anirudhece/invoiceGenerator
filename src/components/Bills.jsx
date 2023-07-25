import React, { useState } from "react";
import { Container, Typography, Box, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WifiProtectedSetupIcon from "@mui/icons-material/WifiProtectedSetup";
import Divider from "@mui/material/Divider";

import { useDispatch, useSelector } from "react-redux";
import { deleteInvoiceReducer } from "../store/slices/InvoiceSliceReducer";

const Bills = () => {
  const dispatch = useDispatch();
  const { invoices } = useSelector((state) => state.InvoiceSlice);

  const [isHovered, setIsHovered] = useState(false);

  const deleteInvoice = (invoiceId) => {
    dispatch(deleteInvoiceReducer({ invoiceId }));
  };
  return (
    <Container sx={{ backgroundColor: "white", marginTop: "10px" }}>
      <Typography align="center">LIST OF INVOICES</Typography>
      <>
        {invoices.map((ele) => {
          return (
            ele.id && (
              <Box
                key={ele.id}
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
                    <Typography>{ele.billTo}</Typography>
                    <Typography size="large">{ele.dateOfIssue}</Typography>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center" className="rightSide">
                  <Tooltip title="Delete">
                    <IconButton aria-label="delete" sx={{ marginRight: "5px" }}>
                      <DeleteIcon
                        fontSize="large"
                        color="warning"
                        onClick={(e) => {
                          deleteInvoice(ele.id);
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="view">
                    <IconButton aria-label="view" sx={{ marginRight: "5px" }}>
                      <VisibilityIcon fontSize="large" color="info" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="edit">
                    <IconButton aria-label="edit" sx={{ marginRight: "5px" }}>
                      <WifiProtectedSetupIcon
                        fontSize="large"
                        color="secondary"
                      />
                    </IconButton>
                  </Tooltip>
                  <Typography textAlign="center" sx={{ marginRight: "15px" }}>
                    {ele.total}
                  </Typography>
                </Box>
                {/* </Box> */}
                <Divider />
              </Box>
            )
          );
        })}
      </>
    </Container>
  );
};
export default Bills;
