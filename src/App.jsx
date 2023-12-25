import "./App.css";
import KanbanBoard from "./components/KanbanBoard";

function App() {
  
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-5">Kanban Board</h1>
      <KanbanBoard />
    </div>
  );
}

export default App;
