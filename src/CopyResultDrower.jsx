import {
  Box,
  IconButton,
  Snackbar,
  Stack,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { calcContentForCopy } from "./utils";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export const CopyResultDrower = ({ open, onClose, onOpen, counters }) => {
  const copyContent = calcContentForCopy(counters);
  const [copyText, setCopyText] = useState(copyContent);
  const [isOpenSnack, setOpenSnack] = useState(false);

  const handleCopy = () => {
    const copyEl = document.getElementById("copy");
    copyEl.select();
    copyEl.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.getSelection().removeAllRanges();
    copyEl.blur();

    setOpenSnack(true);
  };

  useEffect(() => {
    setCopyText(copyContent);
  }, [open, copyContent]);

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
    >
      <Box sx={{ minHeight: "300px", padding: "16px" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5">Скопировать результаты</Typography>
          <IconButton onClick={handleCopy}>
            <ContentCopyIcon />
          </IconButton>
        </Stack>
        <TextField
          multiline
          id="copy"
          value={copyText}
          onChange={(e) => setCopyText(e.target.value)}
          fullWidth
          sx={{ marginTop: 1 }}
          autoCorrect="off"
          autoCapitalize="off"
          spellcheck="false"
        />
      </Box>

      <Snackbar
        open={isOpenSnack}
        autoHideDuration={2000}
        onClose={() => setOpenSnack(false)}
        message="Скопировано"
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
