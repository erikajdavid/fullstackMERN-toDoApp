import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan} from "@fortawesome/free-solid-svg-icons";

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
        <div className="todoWrapper">
            <button
                onClick={() => updateTodo(todo._id, todo.status)}
            >
                {(todo.status ? "☑" : "☐")}
            </button>
            <p>{todo.todo}</p>
            <button onClick={() => deleteTodo(todo._id)}>
                <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
            </button>
        </div>
      )
}


export default Todo;