import React, {useRef, useState, useLayoutEffect, useEffect} from "react";
import {useSelector} from "react-redux";
import {selectTodoById, useUpdateTodoMutation} from "../../features/todos/todosSlice"; // Assuming you have an updateTodoNotes action creator

function ResizableTextarea({todoId}) {
    const textbox = useRef(null);
    const [updateTodo] = useUpdateTodoMutation();

    const todo = useSelector((state) => selectTodoById(state, todoId));
    const [notes, setNotes] = useState("");

    // update local notes value when todoId is changed
    useEffect(() => {
        setNotes(todo.notes || "");
    }, [todoId]);

    useLayoutEffect(() => {
        adjustHeight();
    }, [notes]);

    function adjustHeight() {
        textbox.current.style.height = "inherit";
        textbox.current.style.height = `${textbox.current.scrollHeight}px`;
    }

    const handleInputChange = (e) => {
        adjustHeight();
        setNotes(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTodo({id: todoId, notes: notes});
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
                value={notes}
                className="notes"
                placeholder="(Press Enter to submit notes)"
            />
        </form>
    );
}

export default ResizableTextarea;
