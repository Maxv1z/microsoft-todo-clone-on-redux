import React, {useRef, useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {selectTodoById, useUpdateTodoMutation} from "../../features/todos/todosSlice";

function ResizableTitle({todoId}) {
    const [title, setTitle] = useState(""); // Local state for managing changes
    const textbox = useRef(null);
    const todo = useSelector((state) => selectTodoById(state, todoId));
    const [updateTodo] = useUpdateTodoMutation();

    // Update local state when todoId changes
    useEffect(() => {
        setTitle(todo.title || "");
    }, [todoId]);

    useEffect(() => {
        adjustHeight();
    }, [title]);

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
