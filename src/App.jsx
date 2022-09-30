import "./App.css";

import { TodoProvider } from "./context/TodosContext";
import Rotas from "./routes/Rotas";

function App() {
  return (
    <TodoProvider>
      <div className="App">
        <Rotas />
      </div>
    </TodoProvider>
  );
}

export default App;
