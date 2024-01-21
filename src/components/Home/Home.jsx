import React from "react";
import Lists from "../Lists/Lists";
import TodoList from "../Todos/TodoList";
import "./Home.style.scss";
import TodoSidebar from "../TodoSidebar/TodoSidebar";
import {selectActiveTodo} from "../../features/activeTodo/activeTodoSlice";
import {useSelector} from "react-redux";

function Home() {
    const activeTodo = useSelector(selectActiveTodo);
    const isNoActiveTodo = activeTodo === null;

    return (
        <div className={`home-container ${isNoActiveTodo ? "sidebar-hidden" : ""}`}>
            <Lists className="lists" />
            <TodoList className="todo-lists" />
            {!isNoActiveTodo && (
                <TodoSidebar className="todo-sidebar" activeTodo={activeTodo} />
            )}
        </div>
    );
}

export default Home;
