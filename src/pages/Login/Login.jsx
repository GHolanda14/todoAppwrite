import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { account } from "../../config/appWriteConfig";
import { TodoContext } from "../../context/TodosContext";

const Login = () => {
  const emailRef = useRef();
  const senhaRef = useRef();
  const centralizar = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const navigate = useNavigate();

  const [visibility, setVisibility] = useState(true);
  const [error, setError] = useState("");
  const { setUser } = useContext(TodoContext);

  const verificaEmail =
    error && error.toLowerCase().includes("e-mail") ? error : "";
  const verificaSenha =
    error && error.toLowerCase().includes("credenciais") ? error : "";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const promise = account.createEmailSession(
      emailRef.current.value,
      senhaRef.current.value
    );

    promise
      .then((res) => {
        setUser(res);
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err.message);
        if (err.message.toLowerCase().includes("invalid credentials")) {
          setError("Credenciais inválidas");
        } else if (err.message.toLowerCase().includes("invalid email")) {
          setError("Insira um e-mail válido");
        }
      });
  };
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Paper
        component="div"
        elevation={1}
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          flexBasis: 500,
        }}
      >
        <Grid item mb={1} sx={centralizar}>
          <Typography variant="h5">Login</Typography>
        </Grid>
        <Grid item sx={{ m: 1 }}>
          <Paper
            component="form"
            elevation={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignSelf: "center",
              p: 2,
            }}
            onSubmit={handleSubmit}
            id="formCadastro"
          >
            <TextField
              inputRef={emailRef}
              label="Email"
              placeholder="exemplo@provedor.com"
              type="email"
              error={verificaEmail != ""}
              helperText={verificaEmail}
              onChange={() => error && setError("")}
              sx={{ m: 1 }}
            />
            <TextField
              inputRef={senhaRef}
              label="Senha"
              type={visibility ? "password" : "text"}
              placeholder="Insira sua senha"
              error={verificaSenha != ""}
              helperText={verificaSenha}
              onChange={() => error && setError("")}
              sx={{ m: 1 }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setVisibility(!visibility)}>
                    {visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                ),
              }}
            />
            <Button type="submit" variant="contained" sx={{ m: 1 }}>
              Entrar
            </Button>

            <Grid item sx={{ m: 1 }}>
              <Divider>OU</Divider>
            </Grid>
            <Grid item sx={centralizar}>
              <Typography variant="body1">
                Não tem uma conta?
                <Link to="/register">
                  <span> Cadastre-se!</span>
                </Link>
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Login;
