import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { databases, id } from "../../config/appWriteConfig";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const handleAdd = () => {
    databases
      .createDocument(
        "633496a02113c179a318",
        "633496a50483ad68bf49",
        id.unique(),
        {
          todo,
        }
      )
      .then((res) => {
        setTodo("");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <Paper variant="form" sx={{ width: "100%", display: "flex" }}>
        <FormControl fullWidth>
          <InputLabel>ToDo</InputLabel>
          <OutlinedInput
            placeholder="Descreva a tarefa"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton disabled={todo === ""} onClick={() => handleAdd()}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Paper>
    </>
  );
};

export default TodoForm;
