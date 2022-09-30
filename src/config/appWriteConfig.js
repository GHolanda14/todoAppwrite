import { Account, Client, Databases, ID } from "appwrite";
import { useContext } from "react";
import { TodoContext } from "../context/TodosContext";

export const client = new Client()
  .setEndpoint("http://localhost:3001/v1") // Your API Endpoint
  .setProject("6334735e4ba1dd269ce5"); // Your project ID

export const account = new Account(client);

export const id = ID;

export const databases = new Databases(client, "633496a02113c179a318");

export const cadastrarUser = async (email, senha, nome) => {
  const promise = account.create(ID.unique(), email, senha, nome);

  promise.then(
    function (response) {
      console.log(response); // Success
    },
    function (error) {
      console.log(error); // Failure
    }
  );
};

export const loginEmail = (email, senha) => {
  const promise = account.createEmailSession(email, senha);

  promise.then(
    function (response) {
      console.log(response); // Success
    },
    function (error) {
      console.log(error);
    }
  );
};

export const validarEmail = () => {
  const promise = account.createVerification("localhost");

  promise.then(
    function (response) {
      console.log(response); // Success
    },
    function (error) {
      console.log(error); // Failure
    }
  );
};

export const logout = () => {
  const promise = account.deleteSession("current");

  promise.then(
    function (response) {
      console.log(response); // Success
    },
    function (error) {
      console.log(error); // Failure
    }
  );
};

const appWriteConfig = {
  account,
  loginEmail,
  cadastrarUser,
  validarEmail,
  logout,
  id,
  client,
};

export default appWriteConfig;
