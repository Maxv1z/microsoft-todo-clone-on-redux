import React, {useRef, useState, useLayoutEffect, useEffect} from "react";
import {useSelector} from "react-redux";
import {selectTodoById, useUpdateTodoMutation} from "../../features/todos/todosSlice"; // Assuming you have an updateTodoNotes action creator

function ResizableTextarea({todoId}) {
    const [notes, setNotes] = useState("");
    const textbox = useRef(null);

    const [updateTodo] = useUpdateTodoMutation();

    const todo = useSelector((state) => selectTodoById(state, todoId));

    // update local notes value when todoId is changed
    useEffect(() => {
        setNotes(todo.notes || "");
    }, [todoId]);
    // calling adjustHeight on every notes changes
    useLayoutEffect(() => {
        adjustHeight();
    }, [notes]);

    /// actively change the height of textarea best on inner text
    function adjustHeight() {
        textbox.current.style.height = "inherit";
        textbox.current.style.height = `${textbox.current.scrollHeight}px`;
    }
    /// set input value to notes var
    const handleInputChange = (e) => {
        setNotes(e.target.value);
    };
    // update todos title
    const handleSubmit = (e) => {
        e.preventDefault();
        updateTodo({id: todoId, notes: notes});
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
                value={notes}
                className="notes"
                placeholder="(Press Enter to submit notes)"
            />
        </form>
    );
}

export default ResizableTextarea;
