import React, {useState} from "react";
import {useSelector} from "react-redux";
import Todo from "../Todo/Todo";
import {nanoid} from "nanoid";
import {
    useAddTodoMutation,
    useGetTodosQuery,
    selectCompletedTodos,
    selectUncompletedTodos,
} from "../../../features/todos/todosSlice";
import {selectActiveList} from "../../../features/chosenList/chosenListSlice";
import TodosTopBar from "../TodosTopBar/TodosTopBar";
import {selectSortingCriteria} from "../../../features/sortingCriteria/sortingCriteriaSlice";

import "./TodoList.style.scss";
import TodayTodos from "../TodayTodos/TodayTodos";
import StarredTodos from "../StarredTodos/StarredTodos";
import PlannedTodos from "../PlannedTodos/PlannedTodos";
import SearchTodos from "../SearchTodos/SearchTodos";
import {selectIsSearch} from "../../../features/isSearching/searchingSlice";

function TodoList() {
    const {isLoading, isSuccess, isError, error} = useGetTodosQuery();
    const [addTodo] = useAddTodoMutation();
    const activeList = useSelector(selectActiveList);
    const [title, setTitle] = useState("");
    const [showCompletedTodos, setShowCompletedTodos] = useState(false);
    const sortCriteria = useSelector(selectSortingCriteria);
    const isSearch = useSelector(selectIsSearch);

    // fetching completed todos to show
    const completedTodos = useSelector(selectCompletedTodos);
    // fetching uncompleted todos to show on button click
    const uncompletedTodos = useSelector(selectUncompletedTodos);

    if (isLoading) {
        return <p>Loading...</p>;
    } else if (isError) {
        return <p>{error.message}</p>;
    } else if (isSearch) {
        return <SearchTodos />;
    } else if (activeList == 1) {
        return <TodayTodos />;
    } else if (activeList == 2) {
        return <StarredTodos />;
    } else if (activeList == 3) {
        return <PlannedTodos />;
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
            timeToFinish: null,
        });
        setTitle("");
    };

    const sortTodos = (uncompletedTodos) => {
        return [...uncompletedTodos].sort((a, b) => {
            if (sortCriteria == "createdAt") {
                return a.createdAt - b.createdAt;
            } else if (sortCriteria == "title") {
                return a.title.localeCompare(b.title);
            } else if (sortCriteria == "starred") {
                return b.starred - a.starred;
            } else {
                return 0;
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
                            <Todo key={todo.id} todoId={todo.id} />
                        </li>
                    ))}
                    <li key="show completed todo button">
                        {completedTodos.length > 0 && (
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

export default TodoList;
