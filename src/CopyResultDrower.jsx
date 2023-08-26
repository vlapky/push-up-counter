import {
  Box,
  IconButton,
  Stack,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { calcContent, calcContentForCopy, calcCurrentDate } from "./utils";
import { Fragment } from "react";

export const CopyResultDrower = ({ open, onClose, onOpen, counters }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(calcContentForCopy(counters));
  };

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
        <Typography variant="body1">{calcCurrentDate()}</Typography>
        {Object.keys(counters).map((id) => {
          const { name, counter } = counters[id];
          return (
            <Fragment key={id}>
              <Typography variant="body1">{name}</Typography>
              <Typography variant="body1">{calcContent(counter)}</Typography>
            </Fragment>
          );
        })}
      </Box>
    </SwipeableDrawer>
  );
};
