import React, {useState} from "react";
import {useSelector} from "react-redux";
import Todo from "./Todo";
import {nanoid} from "nanoid";
import {useAddTodoMutation, useGetTodosQuery} from "../../features/todos/todosSlice";
import {selectActiveList} from "../../features/chosenList/chosenListSlice";

import "./TodoList.style.scss";

import {selectTodoIdsByFilter} from "../../features/chosenList/chosenListSlice";

function TodoList() {
    const {isLoading, isSuccess, isError, error} = useGetTodosQuery();
    const [addTodo] = useAddTodoMutation();

    const activeList = useSelector(selectActiveList);

    const [title, setTitle] = useState("");

    // gets todosIds, by filtering list
    const todosIdsFromFilter = useSelector(selectTodoIdsByFilter);

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isError) {
        content = <p>{error.message}</p>;
    } else {
        content = <p>No data available.</p>;
    }
    if (isError || isLoading) {
        return <>{content}</>;
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
        });
        setTitle("");
    };

    return (
        <div className="todos-main-container">
            <div className="todos-list-container">
                <ul>
                    {todosIdsFromFilter.map((todoId) => (
                        <li key={todoId} className="todo">
                            <Todo key={todoId} todoId={todoId} />
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
