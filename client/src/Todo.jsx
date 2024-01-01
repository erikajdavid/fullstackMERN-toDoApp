
const Todo = ({ todo, setTodos }) => {

    const updateTodo = async (todoId, todoStatus) => {
        const res = await fetch(`/api/todos/${todoId}`, {
            method: "PUT",
            body: JSON.stringify({ status: todoStatus }),
            headers: {
                "Content-Type": "application/json"
            } 
        });

        const json = await res.json();
        if (json.acknowledged) {
            setTodos(currentTodos => {
                return currentTodos.map((currentTodo) => {
                    if (currentTodo._id === todoId) {
                        return { ...currentTodo, status: !currentTodo.status }
                    } 
                    return currentTodo;
                });
            });
        }
    };

    const deleteTodo = async (todoId) => {
        const res = await fetch(`api/todos/${todoId}`, {
            method: "DELETE",
        });

        const json = await res.json(); {
            if (json.acknowledged) {
                setTodos(currentTodos => {
                    return currentTodos.filter((currentTodo) => (currentTodo._id !== todoId));
                })
            }
        }
    };

    return(
        <>
            <div>
                <p>{todo.todo}</p>
                <div>
                    <button onClick={() => deleteTodo(todo._id)}>
                        <p>delete</p>
                    </button>
                    <button
                        onClick={() => updateTodo(todo._id, todo.status)}
                    >
                        {(todo.status ? "☑" : "☐")}
                    </button>

                </div>
            </div>
        </>
      )
}


export default Todo;