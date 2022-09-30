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
import { Link } from "react-router-dom";
import { cadastrarUser, loginEmail } from "../../config/appWriteConfig";
import { TodoContext } from "../../context/TodosContext";

const Register = () => {
  const nomeRef = useRef();
  const emailRef = useRef();
  const senhaRef = useRef();
  const confirmSenhaRef = useRef();

  const [visibility, setVisibility] = useState(true);
  const [error, setError] = useState("");
  const { setUser } = useContext(TodoContext);

  const centralizar = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const verificaNome = error && error.includes("nome") ? error : "";
  const verificaSenha = error && error.includes("senhas") ? error : "";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (nomeRef.current.value.length < 3) {
      setError("O nome deve ter no mínimo 3 caracteres");
      return;
    }
    if (senhaRef.current.value !== confirmSenhaRef.current.value) {
      setError("As senhas devem ser iguais!");
      return;
    }

    cadastrarUser(
      emailRef.current.value,
      senhaRef.current.value,
      nomeRef.current.value
    )
      .then(() => {
        loginEmail(emailRef.current.value, senhaRef.current.value).then(
          (res) => {
            setUser(res);
            navigate("/profile");
          },
          (err) => console.log(err)
        );
      })
      .catch((error) => console.log(error));
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
          <Typography variant="h5">Cadastre-se</Typography>
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
              inputRef={nomeRef}
              onChange={() => setError("")}
              label="Nome"
              placeholder="Insira seu nome"
              sx={{ m: 1 }}
              error={verificaNome !== ""}
              helperText={verificaNome}
            />
            <TextField
              inputRef={emailRef}
              label="Email"
              placeholder="exemplo@provedor.com"
              type="email"
              sx={{ m: 1 }}
            />
            <TextField
              inputRef={senhaRef}
              label="Senha"
              type={visibility ? "password" : "text"}
              placeholder="Insira sua senha"
              sx={{ m: 1 }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setVisibility(!visibility)}>
                    {visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              inputRef={confirmSenhaRef}
              onChange={() => setError("")}
              error={verificaSenha !== ""}
              helperText={verificaSenha}
              label="Confirmação de senha"
              type={visibility ? "password" : "text"}
              placeholder="Confirme sua senha"
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
              Cadastre-se
            </Button>

            <Grid item sx={{ m: 1 }}>
              <Divider>OU</Divider>
            </Grid>
            <Grid item sx={centralizar}>
              <Typography variant="body1">
                Já está cadastrado?{" "}
                <Link to="/login">
                  <span>Clique aqui</span>
                </Link>
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Register;
