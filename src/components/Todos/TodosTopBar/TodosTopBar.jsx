import "./TodosTopBar.style.scss";
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

function TodosTopBar() {
    const {isLoading, error} = useGetListsQuery();
    const [deleteList] = useDeleteListMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const activeList = useSelector(selectActiveList);
    const dispatch = useDispatch();

    if (isLoading) {
        return <>Loading...</>;
    } else if (error) {
        return <>{error}</>;
    }

    const todos = useSelector(selectTodosByListId);

    const onDeleteList = async () => {
        const idsToDelete = todos.map((todo) => todo.id);
        // Use map to create an array of Promises for each deleteTodo call
        const deletePromises = idsToDelete.map((id) => deleteTodo({id: id}));
        // Wait for all todo deletions to complete
        await Promise.all(deletePromises);
        // Continue with the rest of the code
        await deleteList({id: list.id});
        dispatch(changeListChoice(1));
        dispatch(changeActiveTodo(null));
    };

    const menuItemStyle = {
        width: "300px",
    };

    const list = useSelector((state) => selectListById(state, activeList));

    const menu = (
        <Menu>
            {list.id != 1 && list.id != 2 && (
                <Menu.Item key="rename">Rename list</Menu.Item>
            )}
            <Menu.SubMenu key="submenu" title="Sorting...">
                <Menu.Item
                    onClick={() => dispatch(changeSortingCriteria("createdAt"))}
                    style={menuItemStyle}
                >
                    Sort by date
                </Menu.Item>
                <Menu.Item
                    onClick={() => dispatch(changeSortingCriteria("title"))}
                    style={menuItemStyle}
                >
                    Sort by title
                </Menu.Item>
                <Menu.Item
                    onClick={() => dispatch(changeSortingCriteria("starri sed"))}
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
                    onClick={onDeleteList}
                >
                    Delete List
                </Menu.Item>
            )}
        </Menu>
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
        </div>
    );
}

export default TodosTopBar;
