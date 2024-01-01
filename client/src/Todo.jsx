
const Todo = ({ todo }) => {

    return(
        <>
        <div key={todo._id}>
            <p>{todo.todo}</p>
        <div>
            <button>
            {(todo.status ? "☑" : "☐")}
            </button>
        </div>
        </div>
        </>

      )

}

export default Todo;