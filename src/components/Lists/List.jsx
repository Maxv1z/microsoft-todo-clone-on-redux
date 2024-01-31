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
import {Dropdown, Menu, Input, Modal} from "antd";

function List({listId}) {
    const dispatch = useDispatch();
    const [isModalOpen, setModalOpen] = useState(false);

    const [deleteList] = useDeleteListMutation();
    const [updateList] = useUpdateListMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const [editing, setEditing] = useState(false);
    const [newName, setNewName] = useState("");

    const todos = useSelector(selectTodosByListId);
    const list = useSelector((state) => selectListById(state, listId));

    ///////////
    // work with modal to delete list together with its todos async
    ///////////
    const handleOpenModal = () => {
        setModalOpen(true);
    };
    // on 'Delete' button click. Closes the modal, gets ids from that list, asyncly deletes each todo
    const handleModalOk = async () => {
        setModalOpen(false);
        const idsToDelete = todos.map((todo) => todo.id);
        const deletePromises = idsToDelete.map((id) => deleteTodo({id: id}));
        await Promise.all(deletePromises);
        await deleteList({id: listId});

        dispatch(changeActiveTodo(null));
        dispatch(changeListChoice(1));
    };

    const handleModalCancel = () => {
        setModalOpen(false);
    };
    ///////////
    ///////////

    // filter change
    const handleFilterChange = (listId) => {
        dispatch(changeListChoice(listId));
        dispatch(changeActiveTodo(null));
    };

    ///////////
    // work with renaming list
    ///////////
    const handleRenameClick = () => {
        setEditing(true);
        setNewName(list.name);
    };

    const handleRenameConfirm = () => {
        setEditing(false);
        updateList({id: listId, name: newName});
    };
    ///////////
    ///////////

    // menu for dropdown menu to work with particular list
    const menu = (
        <>
            {list.id != 1 && list.id != 2 && list.id != 3 && (
                <Menu>
                    <Menu.Item key="rename" onClick={handleRenameClick}>
                        Rename list
                    </Menu.Item>

                    <Menu.Item key="delete" danger onClick={handleOpenModal}>
                        Delete
                    </Menu.Item>
                </Menu>
            )}
        </>
    );

    return (
        <>
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
                placement="bottom"
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
            <Modal
                visible={isModalOpen}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                centered={true}
                className="modal-style"
                footer={[
                    <button
                        key="delete"
                        className="ant-btn ant-btn-danger"
                        onClick={handleModalOk}
                    >
                        Delete
                    </button>,
                    <button
                        key="cancel"
                        className="ant-btn ant-btn-default"
                        onClick={handleModalCancel}
                    >
                        Cancel
                    </button>,
                ]}
            >
                <h1>Delete list</h1>
                <p>
                    List <strong>{list.name}</strong> will be permanently deleted with all
                    todos.
                </p>
            </Modal>
        </>
    );
}

export default List;
