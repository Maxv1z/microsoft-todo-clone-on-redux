import {useSelector} from "react-redux";
import {selectTodoById} from "../../features/todos/todosSlice";
import "./Todo.style.scss";

function Todo({todoId}) {
    const todo = useSelector((state) => selectTodoById(state, todoId));

    return (
        <article className="todo">
            <p>{todo.title}</p>
        </article>
    );
}

export default Todo;
