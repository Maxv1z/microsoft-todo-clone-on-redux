import "./TodoSidebar.style.scss";
import ResizableTextarea from "./ResizableTextarea";
import {useDispatch, useSelector} from "react-redux";

import {
    selectTodoById,
    useDeleteTodoMutation,
    useGetTodosQuery,
    useUpdateTodoMutation,
} from "../../features/todos/todosSlice";
import {changeActiveTodo} from "../../features/activeTodo/activeTodoSlice";

function TodoSidebar({activeTodo}) {
    const dispatch = useDispatch();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();
    const todo = useSelector((state) => selectTodoById(state, activeTodo));

    const dateObject = new Date(todo.createdAt);

    const handleToggleTodo = async () => {
        updateTodo({id: activeTodo, completed: !todo.completed});
    };

    const {isLoading, isSuccess, isError, error} = useGetTodosQuery();
    if (isLoading) {
        return <p>Loading...</p>;
    }
    return (
        <div className="todo-sidebar-container">
            <div className="todo-info">
                <div className="block todo-title-container">
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={todo.completed}
                        onClick={handleToggleTodo}
                    />
                    <p className="title">{todo.title}</p>
                </div>
                <div className="block add-for-today">
                    <button>Add task for today</button>
                </div>
                <div className="block time-block-container">
                    <button>Remind</button>
                    <button>Add deadline</button>
                    <button>Repeat</button>
                </div>
                <div className="block assign-container">
                    <button>Assign</button>
                </div>
                <div className="block add-file-container">
                    <button>Add file</button>
                </div>
                <div className="block notes-container">
                    <ResizableTextarea todoId={todo.id} />
                </div>
            </div>
            <div className="date-and-delete-button">
                <p className="date">{dateObject.toLocaleDateString()}</p>
                <button
                    className="delete-button"
                    onClick={() => {
                        deleteTodo({id: activeTodo});
                        dispatch(changeActiveTodo(null));
                    }}
                >
                    delete
                </button>
            </div>
        </div>
    );
}

export default TodoSidebar;
