import React, {useState} from "react";
import {useSelector} from "react-redux";
import Todo from "./Todo";
import {nanoid} from "nanoid";
import {
    useAddTodoMutation,
    useGetTodosQuery,
    selectCompletedTodos,
    selectTodoById,
    selectUncompletedTodos,
} from "../../features/todos/todosSlice";
import {
    selectActiveList,
    selectTodoIdsByFilter,
} from "../../features/chosenList/chosenListSlice";

import "./TodoList.style.scss";

function TodoList() {
    const {isLoading, isSuccess, isError, error} = useGetTodosQuery();
    const [addTodo] = useAddTodoMutation();
    const activeList = useSelector(selectActiveList);
    const [title, setTitle] = useState("");
    const [showCompletedTodos, setShowCompletedTodos] = useState(false);
    const [sortCriteria, setSortCriteria] = useState("createdAt");

    // const todosIdsFromFilter = useSelector(selectTodoIdsByFilter);

    // fetching completed todos to show
    const completedTodos = useSelector(selectCompletedTodos);
    // fetching uncompleted todos to show on button click
    const uncompletedTodos = useSelector(selectUncompletedTodos);

    if (isLoading) {
        return <p>Loading...</p>;
    } else if (isError) {
        return <p>{error.message}</p>;
    }

    const handleAddTask = (e) => {
        e.preventDefault();
        addTodo({
            id: nanoid(),
            createdAt: Date.now(),
            title: title,
            notes: "",
            file: null,
            starred: false,
            listId: activeList,
            completed: false,
        });
        setTitle("");
    };

    const sortTodos = (uncompletedTodos) => {
        return [...uncompletedTodos].sort((a, b) => {
            if (sortCriteria === "createdAt") {
                return b.createdAt - a.createdAt;
            } else if (sortCriteria === "title") {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });
    };

    return (
        <div className="todos-main-container">
            <div className="todos-list-container">
                <div className="sort-criteria">
                    <button onClick={() => setSortCriteria("createdAt")}>
                        Sort by Date
                    </button>
                    <button onClick={() => setSortCriteria("title")}>
                        Sort by Title
                    </button>
                </div>
                <ul>
                    {sortTodos(uncompletedTodos).map((todo) => (
                        <li key={todo.id} className="todo">
                            <Todo key={todo.id} todoId={todo.id} />
                        </li>
                    ))}
                    <li>
                        {(uncompletedTodos.length > 0 || completedTodos.length > 0) && (
                            <div
                                className={`completed-todos-button-container ${
                                    showCompletedTodos ? "open" : ""
                                }`}
                            >
                                <button
                                    className={`completed-todos-button ${
                                        showCompletedTodos ? "open" : ""
                                    }`}
                                    onClick={() =>
                                        setShowCompletedTodos(!showCompletedTodos)
                                    }
                                >
                                    <span className="tick-icon">{">"}</span> Completed
                                    Todos {completedTodos.length}
                                </button>
                            </div>
                        )}
                    </li>
                    {showCompletedTodos &&
                        completedTodos.map((completedTodo) => (
                            <li key={completedTodo} className="todo">
                                {completedTodo && <Todo todoId={completedTodo} />}
                            </li>
                        ))}
                </ul>
            </div>
            <form action="" onSubmit={handleAddTask} className="create-new-task">
                <input
                    className="create-new-task-input"
                    type="text"
                    placeholder="+ Add task"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </form>
        </div>
    );
}

export default TodoList;
