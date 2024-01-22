import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    selectTodoById,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} from "../../features/todos/todosSlice";
import "./Todo.style.scss";
import {Dropdown, Menu} from "antd";
import {selectAllLists} from "../../features/lists/listsSlice";

import {changeActiveTodo} from "../../features/activeTodo/activeTodoSlice";

import {StarFilled, StarOutlined} from "@ant-design/icons";

function Todo({todoId}) {
    const [deleteTodo] = useDeleteTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const lists = useSelector(selectAllLists);

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

            <Menu.SubMenu key="submenu" title="Tranfer to...">
                {lists.map((list) => (
                    <Menu.Item
                        key={list.id}
                        onClick={() => updateTodo({id: todoId, listId: list.id})}
                    >
                        {list.name}
                    </Menu.Item>
                ))}
            </Menu.SubMenu>
        </Menu>
    );

    const todo = useSelector((state) => selectTodoById(state, todoId));

    const handleToggleTodo = async () => {
        updateTodo({id: todoId, completed: !todo.completed});
    };

    const handleStarTodo = async () => {
        updateTodo({id: todoId, starred: !todo.starred});
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
                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={todo.completed}
                        onClick={handleToggleTodo}
                    />
                    <p className={`todo-title ${todo.completed ? "checked" : ""}`}>
                        {todo.title}
                    </p>
                </div>
                <div className="star-container" onClick={() => handleStarTodo()}>
                    {todo.starred ? (
                        <StarFilled className="star-icon" />
                    ) : (
                        <StarOutlined className="star-icon" />
                    )}
                </div>
            </article>
        </Dropdown>
    );
}

export default Todo;
