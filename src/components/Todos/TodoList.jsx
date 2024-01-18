import React from "react";
import {useSelector} from "react-redux";
import Todo from "./Todo";
import {useGetTodosQuery, selectTodosIds} from "../../features/todos/todosSlice";

import {selectTodoIdsByFilter} from "../../features/chosenList/chosenListSlice";

function TodoList() {
    const {isLoading, isSuccess, isError, error} = useGetTodosQuery();
    // const todosIds = useSelector(selectTodosIds);

    const todosIdsFromFilter = useSelector(selectTodoIdsByFilter);

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = todosIdsFromFilter.map((todoId) => (
            <Todo key={todoId} todoId={todoId} />
        ));
    } else if (isError) {
        content = <p>{error.message}</p>;
    } else {
        content = <p>No data available.</p>;
    }

    return <section>{content}</section>;
}

export default TodoList;