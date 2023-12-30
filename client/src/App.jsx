import { useEffect, useState } from "react";

function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getTodos() {
      try {
        const res = await fetch("/api/todos");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const todos = await res.json();
        setMessage(todos.message);

      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
  
    getTodos();
  }, []);
  
  
  //keeping the dependency array empty means it's only going to run one time. 
  //we only want to get our todos one time. 

  return (
    <main className="container">
      <h1>Hello World!</h1>
      {message && <p>{message}</p>}
    </main>
  );
}

export default App;
