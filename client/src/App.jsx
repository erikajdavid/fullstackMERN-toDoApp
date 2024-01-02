import { useEffect, useState } from "react";
import Todo from "./Todo";

function App() {

  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    async function getTodos() {
      try {
         const res = await fetch("/api/todos");
   
         if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
         }
   
         const todos = await res.json();
         setTodos(todos);
      } catch (error) {
         console.error("Error fetching todos:", error);
      }
   }   
    getTodos();
  }, []);
  
  const createNewTodo = async (e) => {
    e.preventDefault();
    if (content.length >= 1) {
      const res = await fetch("api/todos", {
        method: "POST",
        body: JSON.stringify({ todo: content }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newTodo = await res.json();

      setContent("");
      setTodos([...todos, newTodo]);
    }
  }
  
  //keeping the dependency array empty means it's only going to run one time. 
  //we only want to get our todos one time. 

  //pre tag instead of div makes the JSON data easier to read, better formatted.

  return (
    <main className="container">
      <h1>To-do App</h1>
      <form onSubmit={createNewTodo}>
        <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter a new todo"
        required
        />
        <button type="submit">Create todo</button>
      </form>
      <div>
        {(todos.length > 0) && 
          todos.map((todo) => {
            return (
              <Todo key={todo._id} todo={todo} setTodos={setTodos}/>
            )
          })
        }
      </div>
      
    </main>
  );
}

export default App;