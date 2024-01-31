import React, {useState} from "react";
import {useSelector} from "react-redux";
import Todo from "../Todo/Todo";
import {nanoid} from "nanoid";
import {
    useAddTodoMutation,
    useGetTodosQuery,
    selectStarredTodos,
} from "../../../features/todos/todosSlice";
import {selectActiveList} from "../../../features/chosenList/chosenListSlice";
import TodosTopBar from "../TodosTopBar/TodosTopBar";
import {selectSortingCriteria} from "../../../features/sortingCriteria/sortingCriteriaSlice";

import "../TodoList/TodoList.style.scss";

function TodayTodos() {
    const [title, setTitle] = useState("");

    const {isLoading, isSuccess, isError, error} = useGetTodosQuery();

    const [addTodo] = useAddTodoMutation();

    const activeList = useSelector(selectActiveList);
    const sortCriteria = useSelector(selectSortingCriteria);
    // fetching completed todos to show
    const starredTodos = useSelector(selectStarredTodos);

    if (isLoading) {
        return <p>Loading...</p>;
    } else if (isError) {
        return <p>{error.message}</p>;
    }

    ///////
    // Add new todo to StarredTodos with - starred: true
    ///////
    const handleAddTask = (e) => {
        e.preventDefault();
        addTodo({
            id: nanoid(),
            createdAt: Date.now(),
            title: title,
            notes: "",
            file: null,
            starred: true,
            listId: activeList,
            completed: false,
            timeToFinish: null,
        });
        setTitle("");
    };
    ///////
    ///////

    //// sort function for unCompleted todos based on sortCriteria (local store value)
    const sortTodos = (starredTodos) => {
        return [...starredTodos].sort((a, b) => {
            if (sortCriteria === "createdAt") {
                return b.createdAt - a.createdAt;
            } else if (sortCriteria === "title") {
                return a.title.localeCompare(b.title);
                /// not including starred sorting
            } else {
                return starredTodos;
            }
        });
    };

    return (
        <div className="todos-main-container">
            <TodosTopBar />
            <div className="todos-list-container">
                <ul>
                    {sortTodos(starredTodos).map((todo) => (
                        <li key={todo.id} className="todo">
                            <Todo key={todo} todoId={todo} />
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
