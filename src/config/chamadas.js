import { loginEmail } from "./appWriteConfig";

export const loginEmail2 = (email, senha) => {
  const data = loginEmail(email, senha);

  data
    .then((res) => {
      console.log("resposta", res);
    })
    .then((data) => {
      console.log("dados", data);
      return data;
    })
    .catch((err) => {
      console.log("erroir", err);
      return err;
    });
  console.log("teste");
};

const chamadas = {
  loginEmail2,
};

export default chamadas;
