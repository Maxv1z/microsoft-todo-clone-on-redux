import {useSelector} from "react-redux";
import Todo from "../Todo/Todo";
import {useGetTodosQuery, selectAllTodos} from "../../../features/todos/todosSlice";
import {selectSearchText} from "../../../features/search/searchingSlice";

function TodoList() {
    const {isLoading, isError, error} = useGetTodosQuery();

    const searchText = useSelector(selectSearchText);
    const allTodos = useSelector(selectAllTodos);

    // Filter todos based on search query
    const filteredTodos = allTodos.filter((todo) =>
        todo.title.toLowerCase().includes(searchText.toLowerCase())
    );

    if (isLoading) {
        return <p>Loading...</p>;
    } else if (isError) {
        return <p>{error.message}</p>;
    }

    return (
        <div className="todos-main-container">
            <div className="todos-list-container" style={{marginTop: "100px"}}>
                <ul>
                    {filteredTodos.length === 0 ? (
                        <h1>No todos found with this title</h1>
                    ) : (
                        filteredTodos.map((todo) => (
                            <li key={todo.id} className="todo">
                                <Todo key={todo.id} todoId={todo.id} />
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}

export default TodoList;
