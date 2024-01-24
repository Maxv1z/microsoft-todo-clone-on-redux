import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    selectTodoById,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} from "../../../features/todos/todosSlice";
import "./Todo.style.scss";
import {Dropdown, Menu, DatePicker, Tooltip} from "antd";
import {selectAllLists} from "../../../features/lists/listsSlice";
import {
    DeleteOutlined,
    MinusCircleOutlined,
    CalendarOutlined,
    SwapOutlined,
} from "@ant-design/icons";

import {changeActiveTodo} from "../../../features/activeTodo/activeTodoSlice";

import {StarFilled, StarOutlined} from "@ant-design/icons";

function Todo({todoId}) {
    const [deleteTodo] = useDeleteTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const lists = useSelector(selectAllLists);
    const dispatch = useDispatch();

    const todo = useSelector((state) => selectTodoById(state, todoId));

    const handleDatePickerChange = async (date) => {
        updateTodo({
            id: todoId,
            timeToFinish: date,
        });
    };

    const handleToggleTodo = async () => {
        updateTodo({id: todoId, completed: !todo.completed});
    };

    const handleStarTodo = async () => {
        updateTodo({id: todoId, starred: !todo.starred});
    };

    const menu = (
        <Menu>
            <Menu.Item
                key="SetForToday"
                onClick={() => {
                    let today = new Date();
                    updateTodo({id: todoId, timeToFinish: today});
                }}
            >
                <CalendarOutlined />
                <span style={{marginLeft: "8px"}}>Set for Today</span>
            </Menu.Item>
            <Menu.Item
                key="SetForTomorrow"
                onClick={() => {
                    let today = new Date();
                    const tomorrow = new Date(today);
                    tomorrow.setDate(today.getDate() + 1);
                    updateTodo({id: todoId, timeToFinish: tomorrow});
                }}
            >
                <CalendarOutlined />
                <span style={{marginLeft: "8px"}}>Set for Tomorrow</span>
            </Menu.Item>
            <Menu.Item
                key="RemoveDate"
                onClick={() => {
                    updateTodo({id: todoId, timeToFinish: null});
                }}
            >
                <MinusCircleOutlined />
                <span style={{marginLeft: "8px"}}>Remove Date to Finish</span>
            </Menu.Item>
            <Menu.SubMenu
                key="date"
                title={
                    <span>
                        <CalendarOutlined />{" "}
                        <span style={{marginLeft: "8px"}}>Choose Date</span>
                    </span>
                }
            >
                <DatePicker
                    onChange={handleDatePickerChange}
                    placeholder="Select Finish Date"
                />
            </Menu.SubMenu>
            <Menu.SubMenu
                key="submenu"
                title={
                    <span>
                        <SwapOutlined />{" "}
                        <span style={{marginLeft: "8px"}}>Transfer to...</span>
                    </span>
                }
            >
                {lists.map((list) => (
                    <Menu.Item
                        key={list.id}
                        onClick={() => updateTodo({id: todoId, listId: list.id})}
                    >
                        {list.name}
                    </Menu.Item>
                ))}
            </Menu.SubMenu>
            <Menu.Item
                key="delete"
                danger
                onClick={() => {
                    deleteTodo({id: todoId});
                    dispatch(changeActiveTodo(null));
                }}
            >
                <DeleteOutlined />
                <span style={{marginLeft: "8px"}}>Delete Todo</span>
            </Menu.Item>
        </Menu>
    );

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
            placement="bottom"
            className="list-container"
        >
            <article
                className={`todo ${todo.completed ? "checked" : ""}`}
                onClick={(e) => {
                    // Prevent activating todo by clicking toggle todo, checkbox, or star-container
                    if (
                        !e.target.classList.contains("checkbox") &&
                        !e.target.classList.contains("star-container") &&
                        !e.target.classList.contains("star-icon")
                    ) {
                        dispatch(changeActiveTodo(todoId));
                    }
                }}
            >
                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        className="checkbox"
                        defaultChecked={todo.completed}
                        onClick={handleToggleTodo}
                    />
                    <div className={`todo-title ${todo.completed ? "checked" : ""}`}>
                        <p>{todo.title}</p>
                        {todo.timeToFinish && (
                            <p className="todo-finishAt">
                                {(() => {
                                    const finishDate = new Date(todo.timeToFinish);
                                    const today = new Date();
                                    const tomorrow = new Date();
                                    tomorrow.setDate(today.getDate() + 1);

                                    if (
                                        finishDate.toDateString() === today.toDateString()
                                    ) {
                                        return "Today";
                                    } else if (
                                        finishDate.toDateString() ===
                                        tomorrow.toDateString()
                                    ) {
                                        return "Tomorrow";
                                    } else {
                                        return finishDate.toLocaleDateString(undefined, {
                                            weekday: "short",
                                            day: "numeric",
                                            month: "short",
                                        });
                                    }
                                })()}
                            </p>
                        )}
                    </div>
                </div>
                <div
                    className="star-container"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleStarTodo();
                    }}
                >
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
