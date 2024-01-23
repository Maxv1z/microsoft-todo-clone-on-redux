import React, {useState} from "react";
import {useSelector} from "react-redux";
import Todo from "../Todo/Todo";
import {nanoid} from "nanoid";
import {
    useAddTodoMutation,
    useGetTodosQuery,
    selectCompletedTodosForToday,
    selectUncompletedTodosForToday,
} from "../../../features/todos/todosSlice";
import {selectActiveList} from "../../../features/chosenList/chosenListSlice";
import TodosTopBar from "../TodosTopBar/TodosTopBar";
import {selectSortingCriteria} from "../../../features/sortingCriteria/sortingCriteriaSlice";

import "../TodoList/TodoList.style.scss";

function TodayTodos() {
    const {isLoading, isSuccess, isError, error} = useGetTodosQuery();
    const [addTodo] = useAddTodoMutation();
    const activeList = useSelector(selectActiveList);
    const [title, setTitle] = useState("");
    const [showCompletedTodos, setShowCompletedTodos] = useState(false);
    const sortCriteria = useSelector(selectSortingCriteria);

    // fetching completed todos to show
    const completedTodos = useSelector(selectCompletedTodosForToday);
    console.log("completed toods for today", completedTodos);
    // fetching uncompleted todos to show on button click
    const uncompletedTodos = useSelector(selectUncompletedTodosForToday);
    console.log("UNcompleted toods for today", uncompletedTodos);

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
            timeToFinish: new Date.now(),
        });
        setTitle("");
    };

    const sortTodos = (uncompletedTodos) => {
        return [...uncompletedTodos].sort((a, b) => {
            if (sortCriteria === "createdAt") {
                return b.createdAt - a.createdAt;
            } else if (sortCriteria === "title") {
                return a.title.localeCompare(b.title);
            } else if (sortCriteria === "starred") {
                return b.starred - a.starred;
            } else {
                return uncompletedTodos;
            }
        });
    };

    return (
        <div className="todos-main-container">
            <TodosTopBar />
            <div className="todos-list-container">
                <ul>
                    {sortTodos(uncompletedTodos).map((todo) => (
                        <li key={todo.id} className="todo">
                            <Todo key={todo} todoId={todo} />
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

export default TodayTodos;
