import React, {useRef, useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {selectTodoById, useUpdateTodoMutation} from "../../features/todos/todosSlice";

function ResizableTitle({todoId}) {
    const [title, setTitle] = useState("");
    const textbox = useRef(null);

    const [updateTodo] = useUpdateTodoMutation();

    const todo = useSelector((state) => selectTodoById(state, todoId));

    // Update local state when todoId changes
    useEffect(() => {
        setTitle(todo.title || "");
    }, [todoId]);
    // calling adjustHeight on every title changes
    useEffect(() => {
        adjustHeight();
    }, [title]);

    /// actively change the height of textarea best on inner text
    const adjustHeight = () => {
        if (textbox.current) {
            textbox.current.style.height = "inherit";
            textbox.current.style.height = `${textbox.current.scrollHeight}px`;
        }
    };
    /// set input value to title var
    const handleInputChange = (e) => {
        setTitle(e.target.value);
    };
    // update todos title
    const handleSubmit = (e) => {
        e.preventDefault();
        updateTodo({id: todoId, title: title});
    };
    /// submiting in enter function
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
