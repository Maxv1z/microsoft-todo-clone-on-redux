import {useSelector} from "react-redux";
import {selectTodoById} from "../../features/todos/todosSlice";

function Todo({todoId}) {
    const todo = useSelector((state) => selectTodoById(state, todoId));

    return (
        <article>
            <h1>{todo.title}</h1>
            <p>{todo.notes}</p>
        </article>
    );
}

export default Todo;
