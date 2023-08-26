import { Fragment, useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import {
  Button,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import { AddingDrower } from "./AddingDrower";
import { calcContent } from "./utils";
import { EditingDrower } from "./EditingDrower";
import { CopyResultDrower } from "./CopyResultDrower";

function App() {
  const [isOpenAdding, setOpenAdding] = useState(false);
  const [isOpenCopyResult, setOpenCopyResult] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [counters, setCounters] = useState(
    JSON.parse(localStorage.getItem("counters")) ?? {}
  );

  useEffect(() => {
    localStorage.setItem("counters", JSON.stringify(counters));
  }, [counters]);

  const handleAdd = (name) => {
    const newId = uuid();
    setCounters((prev) => ({
      ...prev,
      [newId]: {
        name,
        counter: [],
      },
    }));
  };
  const handleEdit = (id, count) => {
    const newCounters = { ...counters };
    newCounters[id].counter.push(count);

    setCounters(newCounters);
  };
  const handleOpenEdit = useCallback(() => {
    setEditingId(editingId);
  }, [editingId]);

  const handleDelete = (id) => {
    const newCounters = { ...counters };
    delete newCounters[id];

    setCounters(newCounters);
  };

  const handleClearCounter = (id) => {
    const newCounters = { ...counters };
    newCounters[id] = {
      ...newCounters[id],
      counter: [],
    };

    setCounters(newCounters);
  };

  return (
    <Container maxWidth="md">
      <Stack
        sx={{ padding: "16px" }}
        direction="row"
        spacing={{ xs: 1 }}
        useFlexGap
        flexWrap="wrap"
        alignItems="center"
      >
        <Typography variant="h5">Подсчет подходов</Typography>
        <Button onClick={() => setOpenAdding(true)} variant="outlined">
          Добавить упражнение
        </Button>
        <Button onClick={() => setOpenCopyResult(true)} variant="outlined">
          Скопировать результаты
        </Button>
      </Stack>

      <List sx={{ width: "100%", maxWidth: 800, bgcolor: "background.paper" }}>
        {Object.keys(counters).map((id) => {
          const { name, counter } = counters[id];

          return (
            <Fragment key={id}>
              <ListItem
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      aria-label="clear"
                      onClick={() => handleClearCounter(id)}
                    >
                      <RefreshIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(id)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemButton onClick={() => setEditingId(id)}>
                  <ListItemText
                    primary={name}
                    secondary={
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {calcContent(counter)}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
              <Divider component="li" />
            </Fragment>
          );
        })}
      </List>

      <AddingDrower
        open={isOpenAdding}
        onOpen={() => setOpenAdding(true)}
        onClose={() => setOpenAdding(false)}
        onAdd={handleAdd}
      />

      <CopyResultDrower
        open={isOpenCopyResult}
        onOpen={() => setOpenCopyResult(true)}
        onClose={() => setOpenCopyResult(false)}
        counters={counters}
      />

      <EditingDrower
        id={editingId}
        counters={counters}
        onOpen={handleOpenEdit}
        onClose={() => setEditingId(null)}
        onEdit={(counter) => handleEdit(editingId, counter)}
      />
    </Container>
  );
}

export default App;
