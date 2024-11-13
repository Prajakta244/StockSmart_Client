import { Box, Typography, TextField, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import React from "react";
import UseForm from "./UseForm";

const ModalC = ({ isOpen, handleClose,modalElement }) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      {modalElement}
    </Dialog>
  );
};

export default ModalC;
