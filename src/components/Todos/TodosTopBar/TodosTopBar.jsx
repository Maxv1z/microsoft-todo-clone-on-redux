import "./TodosTopBar.style.scss";
import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Dropdown, Menu} from "antd";
import {
    selectActiveList,
    changeListChoice,
} from "../../../features/chosenList/chosenListSlice";
import {changeSortingCriteria} from "../../../features/sortingCriteria/sortingCriteriaSlice";
import {selectListById, useGetListsQuery} from "../../../features/lists/listsSlice";
import {useDeleteListMutation} from "../../../features/lists/listsSlice";
import {
    selectTodosByListId,
    useDeleteTodoMutation,
} from "../../../features/todos/todosSlice";
import {changeActiveTodo} from "../../../features/activeTodo/activeTodoSlice";

import {Modal} from "antd";

function TodosTopBar() {
    const [isModalOpen, setModalOpen] = useState(false);
    const {isLoading, error} = useGetListsQuery();

    const [deleteList] = useDeleteListMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const activeList = useSelector(selectActiveList);
    const dispatch = useDispatch();
    const todos = useSelector(selectTodosByListId);
    const list = useSelector((state) => selectListById(state, activeList));

    const idsToDelete = todos.map((todo) => todo.id);

    ///////
    // work with deleting list from TodosTopBar
    ///////
    const handleOpenModal = () => {
        setModalOpen(true);
    };
    // same function as in Lists component
    const handleModalOk = async () => {
        setModalOpen(false);
        const deletePromises = idsToDelete.map((id) => deleteTodo({id: id}));
        await Promise.all(deletePromises);
        await deleteList({id: list.id});
        dispatch(changeListChoice(1));
        dispatch(changeActiveTodo(null));
    };
    const handleModalCancel = () => {
        setModalOpen(false);
    };
    ////////
    ////////

    if (isLoading) {
        return <>Loading...</>;
    } else if (error) {
        return <>{error}</>;
    }

    const menuItemStyle = {
        width: "300px",
    };

    const menu = (
        <>
            {list.id != 3 && (
                <Menu>
                    {list.id != 1 && list.id != 2 && (
                        <Menu.Item key="rename">Rename list</Menu.Item>
                    )}
                    <Menu.SubMenu key="submenu" title="Sorting...">
                        <Menu.Item
                            key="createdAt"
                            onClick={() => dispatch(changeSortingCriteria("createdAt"))}
                            style={menuItemStyle}
                        >
                            Sort by date
                        </Menu.Item>
                        <Menu.Item
                            key="title"
                            onClick={() => dispatch(changeSortingCriteria("title"))}
                            style={menuItemStyle}
                        >
                            Sort by title
                        </Menu.Item>
                        <Menu.Item
                            key="star"
                            onClick={() => dispatch(changeSortingCriteria("starred"))}
                            style={menuItemStyle}
                        >
                            Sort by star
                        </Menu.Item>
                    </Menu.SubMenu>
                    {list.id != 1 && list.id != 2 && (
                        <Menu.Item
                            key="delete"
                            danger
                            style={{borderTop: "1px solid gray"}}
                            onClick={handleOpenModal}
                        >
                            Delete List
                        </Menu.Item>
                    )}
                </Menu>
            )}
        </>
    );

    return (
        <div className="todos-top-bar-container">
            <div className="name-and-menu">
                <h1 className="list-name">{list.name}</h1>
                <Dropdown
                    overlay={menu}
                    trigger={["click"]}
                    overlayStyle={{
                        width: "350px",
                        minWidth: "fit-content",
                        textAlign: "center",
                        right: 0,
                    }}
                    style={{backgroundColor: "#202020"}}
                    placement="bottomLeft"
                    className="menu"
                >
                    <p>...</p>
                </Dropdown>
            </div>
            <div className="sorting-buttons"></div>
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
        </div>
    );
}

export default TodosTopBar;
