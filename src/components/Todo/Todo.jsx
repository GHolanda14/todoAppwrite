import {
  Button,
  FormControl,
  IconButton,
  OutlinedInput,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { databases } from "../../config/appWriteConfig";
import { TodoContext } from "../../context/TodosContext";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";

const Todo = ({ todo }) => {
  const { todos, setTodos } = useContext(TodoContext);
  const [edit, setEdit] = useState(false);
  const [task, setTask] = useState(todo.todo);
  const [checked, setChecked] = useState(todo.done);

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
          />
        ) : (
          <Typography
            variant="body1"
            sx={{ textDecoration: checked ? "line-through" : "none" }}
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
