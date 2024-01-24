import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    selectListById,
    useDeleteListMutation,
    useUpdateListMutation,
} from "../../features/lists/listsSlice";

import {
    useDeleteTodoMutation,
    selectTodosByListId,
} from "../../features/todos/todosSlice";

import {changeListChoice} from "../../features/chosenList/chosenListSlice";
import {changeActiveTodo} from "../../features/activeTodo/activeTodoSlice";
import "./List.style.scss";
import {Dropdown, Menu, Input} from "antd";

function List({listId}) {
    const [deleteList] = useDeleteListMutation();
    const [updateList] = useUpdateListMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const [editing, setEditing] = useState(false);
    const [newName, setNewName] = useState("");

    const dispatch = useDispatch();

    const onDeleteList = async () => {
        const todos = useSelector(selectTodosByListId);
        const idsToDelete = todos.map((todo) => todo.id);
        // Use map to create an array of Promises for each deleteTodo call
        const deletePromises = idsToDelete.map((id) => deleteTodo({id: id}));
        // Wait for all todo deletions to complete
        await Promise.all(deletePromises);
        // Continue with the rest of the code
        await deleteList({id: listId});
        dispatch(changeActiveTodo(null));
        dispatch(changeListChoice(1));
    };

    const list = useSelector((state) => selectListById(state, listId));

    const handleFilterChange = (listId) => {
        dispatch(changeListChoice(listId));
        dispatch(changeActiveTodo(null));
    };

    const handleRenameClick = () => {
        setEditing(true);
        setNewName(list.name);
    };

    const handleRenameConfirm = () => {
        setEditing(false);
        updateList({id: listId, name: newName});
    };

    const menu = (
        <>
            {list.id != 1 && (
                <Menu>
                    <Menu.Item key="rename" onClick={handleRenameClick}>
                        Rename list
                    </Menu.Item>

                    <Menu.Item key="delete" danger onClick={onDeleteList}>
                        Delete
                    </Menu.Item>
                </Menu>
            )}
        </>
    );

    return (
        <Dropdown
            overlay={menu}
            trigger={["contextMenu"]}
            onClick={() => handleFilterChange(listId)}
            overlayStyle={{
                width: "350px",
                minWidth: "fit-content",
                textAlign: "center",
                left: 0,
            }}
            style={{backgroundColor: "#202020"}}
            placement="bottomCenter"
            className="list-container"
        >
            {editing ? (
                <Input
                    style={{
                        width: "100%",
                        backgroundColor: "#202020",
                        color: "white",
                        outline: "none",
                        borderRadius: "3px",
                        borderColor: "#333",
                        fontSize: "18px",
                    }}
                    autoFocus
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onPressEnter={handleRenameConfirm}
                    onBlur={() => setEditing(false)}
                />
            ) : (
                <h1
                    className="list-name"
                    style={{
                        margin: "0 0 0 10px",
                    }}
                >
                    {list.name}
                </h1>
            )}
        </Dropdown>
    );
}

export default List;
