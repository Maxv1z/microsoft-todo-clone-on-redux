import React from "react";
import Lists from "../Lists/Lists";
import TodoList from "../Todos/TodoList";
import "./Home.style.scss";

function Home() {
    return (
        <div className="home-container">
            <Lists className="lists" />
            <TodoList className="todo-lists" />
        </div>
    );
}

export default Home;
