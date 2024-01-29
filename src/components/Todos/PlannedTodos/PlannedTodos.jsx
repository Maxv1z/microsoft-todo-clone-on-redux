import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Todo from "../Todo/Todo";
import {nanoid} from "nanoid";
import {
    useAddTodoMutation,
    useGetTodosQuery,
    selectUncompletedPlannedTodos,
    selectCompletedPlannedTodos,
} from "../../../features/todos/todosSlice";
import {selectActiveList} from "../../../features/chosenList/chosenListSlice";
import TodosTopBar from "../TodosTopBar/TodosTopBar";
import {
    changeSortingCriteria,
    selectSortingCriteria,
} from "../../../features/sortingCriteria/sortingCriteriaSlice";

import "../TodoList/TodoList.style.scss";

function PlannedTodos() {
    const {isLoading, isSuccess, isError, error} = useGetTodosQuery();
    const [addTodo] = useAddTodoMutation();
    const activeList = useSelector(selectActiveList);
    const [title, setTitle] = useState("");
    const [showCompletedTodos, setShowCompletedTodos] = useState(false);

    // fetching completed todos to show
    const uncompletedPlannedTodos = useSelector(selectUncompletedPlannedTodos);

    const completedPlannedTodos = useSelector(selectCompletedPlannedTodos);

    if (isLoading) {
        return <p>Loading...</p>;
    } else if (isError) {
        return <p>{error.message}</p>;
    }

    const handleAddTask = (e) => {
        e.preventDefault();
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();

        addTodo({
            id: nanoid(),
            createdAt: Date.now(),
            title: title,
            notes: "",
            file: null,
            starred: false,
            listId: activeList,
            completed: false,
            timeToFinish: formattedDate,
        });
        setTitle("");
    };

    const sortTodos = (todos) => {
        return [...todos].sort((a, b) => {
            return new Date(a.timeToFinish) - new Date(b.timeToFinish);
        });
    };

    return (
        <div className="todos-main-container">
            <TodosTopBar />
            <div className="todos-list-container">
                <ul>
                    {sortTodos(uncompletedPlannedTodos).map((todo) => (
                        <li key={todo.id} className="todo">
                            <Todo key={todo.id} todoId={todo.id} />
                        </li>
                    ))}
                    <li key="show completed todo button">
                        {completedPlannedTodos.length > 0 && (
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
                                    Todos {completedPlannedTodos.length}
                                </button>
                            </div>
                        )}
                    </li>
                    {showCompletedTodos &&
                        completedPlannedTodos.map((completedTodo) => (
                            <li key={completedTodo} className="todo">
                                {completedTodo && (
                                    <Todo todoId={completedTodo} key={completedTodo} />
                                )}
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

export default PlannedTodos;
