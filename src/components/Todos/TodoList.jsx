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

    return (
        <div className="todos-main-container">
            <div className="todos-list-container">
                <ul>
                    {uncompletedTodos &&
                        uncompletedTodos.map((todo) => (
                            <li key={todo} className="todo">
                                <Todo key={todo} todoId={todo} />
                            </li>
                        ))}
                    <li>
                        {(uncompletedTodos.length > 0 || completedTodos.length > 0) && (
                            <button
                                onClick={() => setShowCompletedTodos(!showCompletedTodos)}
                            >
                                {showCompletedTodos ? "Hide" : "Show"} Completed Todos
                            </button>
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
