import React, {useRef, useState} from "react";
import {useSelector} from "react-redux";
import {selectTodoById, useUpdateTodoMutation} from "../../features/todos/todosSlice";

function ResizableTitle({todoId}) {
    const textbox = useRef(null);
    const todo = useSelector((state) => selectTodoById(state, todoId));
    const [title, setTitle] = useState(todo.title); // Local state for managing changes
    const [updateTodo] = useUpdateTodoMutation();

    const adjustHeight = () => {
        if (textbox.current) {
            textbox.current.style.height = "inherit";
            textbox.current.style.height = `${textbox.current.scrollHeight}px`;
        }
    };

    const handleInputChange = (e) => {
        adjustHeight();
        setTitle(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTodo({id: todoId, title: title});
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                ref={textbox}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                value={title}
                className="title"
                placeholder="Title"
            />
        </form>
    );
}

export default ResizableTitle;
