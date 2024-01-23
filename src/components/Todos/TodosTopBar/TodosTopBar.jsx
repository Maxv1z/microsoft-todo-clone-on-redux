import "./TodosTopBar.style.scss";
import {useSelector, useDispatch} from "react-redux";
import {Dropdown, Menu} from "antd";
import {selectActiveList} from "../../../features/chosenList/chosenListSlice";
import {changeSortingCriteria} from "../../../features/sortingCriteria/sortingCriteriaSlice";
import {selectListById, useGetListsQuery} from "../../../features/lists/listsSlice";
import {useDeleteListMutation} from "../../../features/lists/listsSlice";

function TodosTopBar() {
    const {isLoading, error} = useGetListsQuery();
    const dispatch = useDispatch();
    const activeList = useSelector(selectActiveList);
    const [deleteList] = useDeleteListMutation();
    const list = useSelector((state) => selectListById(state, activeList));

    if (isLoading) {
        return <>Loading...</>;
    } else if (error) {
        return <>{error}</>;
    }

    const onDeleteList = () => {
        deleteList({id: list.id});
        dispatch(changeListChoice(null));
    };

    const menuItemStyle = {
        width: "300px",
    };

    const menu = (
        <Menu>
            {list.id !== 1 && <Menu.Item key="rename">Rename list</Menu.Item>}
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
                    onClick={() => dispatch(changeSortingCriteria("starred"))}
                    style={menuItemStyle}
                >
                    Sort by star
                </Menu.Item>
            </Menu.SubMenu>
            {list.id !== 1 && (
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
