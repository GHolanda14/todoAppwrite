import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  FormControl,
  OutlinedInput,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { databases } from "../../config/appWriteConfig";

const Todo = ({ todo }) => {
  const [edit, setEdit] = useState(false);
  const [task, setTask] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setTask(todo.todo);
    setChecked(todo.done);
  }, [todo]);

  const handleChange = (id) => {
    databases.updateDocument(
      "633496a02113c179a318",
      "633496a50483ad68bf49",
      id,
      {
        done: !checked,
      }
    );
    setChecked(!checked);
  };

  const handleDelete = (id) => {
    databases.deleteDocument(
      "633496a02113c179a318",
      "633496a50483ad68bf49",
      id
    );
  };

  const handleEdit = (id) => {
    if (edit) {
      databases.updateDocument(
        "633496a02113c179a318",
        "633496a50483ad68bf49",
        id,
        {
          todo: task,
          done: checked,
        }
      );
    }
    setEdit(!edit);
  };

  return (
    <Paper
      sx={{
        m: 0.5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <FormControl
        sx={{
          m: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          maxWidth: "70%",
          flexGrow: 1,
        }}
        variant="outlined"
      >
        <Switch checked={checked} onChange={() => handleChange(todo.$id)} />
        {edit ? (
          <OutlinedInput
            size="small"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            fullWidth
            multiline
            maxRows={4}
          />
        ) : (
          <Typography
            variant="body1"
            sx={{ textDecoration: todo.done ? "line-through" : "none" }}
          >
            {task}
          </Typography>
        )}
      </FormControl>
      <FormControl sx={{ display: "flex", flexDirection: "row" }}>
        <Button onClick={() => handleEdit(todo.$id)}>
          {edit ? <DoneIcon /> : <EditIcon />}
        </Button>
        <Button onClick={() => handleDelete(todo.$id)}>
          <DeleteIcon />
        </Button>
      </FormControl>
    </Paper>
  );
};

export default Todo;
