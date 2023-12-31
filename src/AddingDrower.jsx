import {
  Box,
  Button,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export const AddingDrower = ({ open, onClose, onOpen, onAdd }) => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClose = () => {
    setInput("");
    onClose();
  };

  const handleAdd = () => {
    if (input.trim() === "") {
      setInput("");
      onClose();
      return;
    }
    onAdd(input);
    setInput("");
    onClose();
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={handleClose}
      onOpen={onOpen}
    >
      <Box sx={{ padding: "16px" }}>
        <Typography variant="h5">Новое упражнение</Typography>
        {open && (
          <TextField
            value={input}
            onChange={handleChange}
            autoFocus
            margin="dense"
            id="exercise"
            label="Название"
            multiline
            fullWidth
            variant="standard"
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
        )}
        <Box height={24} />
        <Button fullWidth onClick={handleAdd} variant="outlined">
          Добавить
        </Button>
      </Box>
    </SwipeableDrawer>
  );
};
