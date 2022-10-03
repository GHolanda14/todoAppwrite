import { AppBar, Button, Grid, Typography } from "@mui/material";
import { Client } from "appwrite";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Todo from "../../components/Todo/Todo";
import TodoForm from "../../components/TodoForm/TodoForm";
import { account, databases, client } from "../../config/appWriteConfig";
import { TodoContext } from "../../context/TodosContext";

const Profile = () => {
  const [userDetails, setUserDetails] = useState();
  const { setUser } = useContext(TodoContext);
  const [todos, setTodos] = useState("");
  const navigate = useNavigate();

  client.subscribe(
    "databases.633496a02113c179a318.collections.633496a50483ad68bf49.documents",
    (response) => {
      if (todos) {
        if (
          response.events.includes(
            "databases.633496a02113c179a318.collections.633496a50483ad68bf49.documents.*.delete"
          )
        ) {
          setTodos(todos.filter((todo) => response.payload.$id !== todo.$id));
        } else if (
          response.events.includes(
            "databases.633496a02113c179a318.collections.633496a50483ad68bf49.documents.*.create"
          )
        ) {
          setTodos([...todos, response.payload]);
        } else if (
          response.events.includes(
            "databases.633496a02113c179a318.collections.633496a50483ad68bf49.documents.*.update"
          )
        ) {
          setTodos(
            todos.map((todo) => {
              if (todo.$id === response.payload.$id) return response.payload;
              return todo;
            })
          );
        }
      }
    }
  );

  useEffect(() => {
    account.get().then(
      (res) => {
        setUserDetails(res.name);
        databases
          .listDocuments("633496a02113c179a318", "633496a50483ad68bf49")
          .then((res) => {
            setTodos(res.documents);
          })
          .catch((err) => console.log(err.message));
      },
      (error) => {
        console.log(error);
        navigate("/login");
      }
    );
  }, []);

  const handleLogout = () => {
    const promise = account.deleteSession("current");

    promise.then(
      () => {
        setUser("");
        navigate("/login");
      },
      (err) => console.log(err)
    );
  };

  return (
    <Grid
      container
      alignItems="flex-start"
      alignContent="flex-start"
      justifyContent="center"
    >
      {userDetails && (
        <>
          <AppBar
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              position: "static",
              pl: "10px",
              pr: "10px",
            }}
          >
            <Typography variant="h4">{`Seja bem-vindo ${userDetails}`}</Typography>
            <Button onClick={handleLogout}>Sair</Button>
          </AppBar>

          <Grid
            item
            sx={{ marginTop: 3 }}
            display="flex"
            flexDirection={"column"}
            flexBasis="500px"
          >
            <TodoForm />
            {todos && todos.map((todo) => <Todo key={todo.$id} todo={todo} />)}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Profile;
