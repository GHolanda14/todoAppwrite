import { createContext, useState } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState("");

  return (
    <TodoContext.Provider value={{ todos, setTodos, user, setUser }}>
      {children}
    </TodoContext.Provider>
  );
};

// export const useTodo
