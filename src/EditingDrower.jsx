import {
  Box,
  Button,
  IconButton,
  Snackbar,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export const EditingDrower = ({ id, counters, onClose, onOpen, onEdit }) => {
  const [input, setInput] = useState("");
  const [isOpenSnack, setOpenSnack] = useState(false);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClose = () => {
    setInput("");
    onClose();
  };
  const handleEdit = () => {
    if (input === "") {
      return;
    }
    if (isNaN(Number(input))) {
      setOpenSnack(true);
      return;
    }
    onEdit(Number(input));
    setInput("");
    onClose();
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={!!id}
      onClose={handleClose}
      onOpen={onOpen}
    >
      <Box sx={{ padding: "16px" }}>
        <Typography variant="h5">{counters[id]?.name}</Typography>
        <TextField
          value={input}
          onChange={handleChange}
          autoFocus
          margin="dense"
          id="count"
          label="Добавить подход"
          type="text"
          fullWidth
          variant="standard"
        />
        <Box height={24} />

        <Button onClick={handleEdit} fullWidth variant='outlined'>Добавить</Button>
      </Box>

      <Snackbar
        open={isOpenSnack}
        autoHideDuration={2000}
        onClose={() => setOpenSnack(false)}
        message="Используйте цифры"
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setOpenSnack(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </SwipeableDrawer>
  );
};
