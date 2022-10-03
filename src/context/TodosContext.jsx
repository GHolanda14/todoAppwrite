import { createContext, useState } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [user, setUser] = useState("");

  return (
    <TodoContext.Provider value={{ user, setUser }}>
      {children}
    </TodoContext.Provider>
  );
};

// export const useTodo
