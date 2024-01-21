import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    selectTodoById,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} from "../../features/todos/todosSlice";
import "./Todo.style.scss";
import {Dropdown, Menu} from "antd";

import {changeActiveTodo} from "../../features/activeTodo/activeTodoSlice";

function Todo({todoId}) {
    const [deleteTodo] = useDeleteTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();

    console.log("TODOID FROM TODO COMPONENT", todoId);

    const dispatch = useDispatch();

    const menu = (
        <Menu>
            <Menu.Item
                key="delete"
                danger
                onClick={() => {
                    deleteTodo({id: todoId});
                    dispatch(changeActiveTodo(null));
                }}
            >
                Delete Todo
            </Menu.Item>
        </Menu>
    );

    const todo = useSelector((state) => selectTodoById(state, todoId));

    const handleToggleTodo = async () => {
        updateTodo({id: todoId, completed: !todo.completed});
    };

    return (
        <Dropdown
            overlay={menu}
            trigger={["contextMenu"]}
            overlayStyle={{
                width: "350px",
                minWidth: "fit-content",
                textAlign: "center",
            }}
            style={{backgroundColor: "#202020"}}
            placement="bottomLeft"
            className="list-container"
            onClick={() => {
                dispatch(changeActiveTodo(todoId));
            }}
        >
            <article className={`todo ${todo.completed ? "checked" : ""}`}>
                <input
                    type="checkbox"
                    className="checkbox"
                    checked={todo.completed}
                    onClick={handleToggleTodo}
                />
                <p className={`todo-title ${todo.completed ? "checked" : ""}`}>
                    {todo.title}
                </p>
            </article>
        </Dropdown>
    );
}

export default Todo;
