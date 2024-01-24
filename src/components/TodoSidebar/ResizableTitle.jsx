import React, {useRef, useLayoutEffect} from "react";
import {useSelector} from "react-redux";
import {selectTodoById, useUpdateTodoMutation} from "../../features/todos/todosSlice"; // Assuming you have an updateTodoNotes action creator

function ResizableTitle({todoId}) {
    const textbox = useRef(null);
    const [updateTodo] = useUpdateTodoMutation();

    const todo = useSelector((state) => selectTodoById(state, todoId));

    function adjustHeight() {
        textbox.current.style.height = "inherit";
        textbox.current.style.height = `${textbox.current.scrollHeight}px`;
    }

    useLayoutEffect(adjustHeight, []);

    function handleKeyDown(e) {
        adjustHeight();
        const title = e.target.value;
        updateTodo({id: todoId, title: title});
    }

    return (
        <textarea
            ref={textbox}
            onChange={handleKeyDown}
            value={todo.title}
            className="title"
            placeholder="Title"
        />
    );
}

export default ResizableTitle;
