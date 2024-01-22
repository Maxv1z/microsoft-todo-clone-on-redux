import {useSelector} from "react-redux";
import List from "./List";
import {nanoid} from "nanoid";

import "./Lists.style.scss";

import {
    useGetListsQuery,
    selectListsIds,
    useAddListMutation,
} from "../../features/lists/listsSlice";

import {selectActiveList} from "../../features/chosenList/chosenListSlice";

function Lists() {
    let content;
    const {isLoading, isSuccess, isError, error} = useGetListsQuery();
    const lists = useSelector(selectListsIds);
    const [addList] = useAddListMutation();

    const handleCreateNewList = (e) => {
        e.preventDefault();
        addList({
            id: nanoid(),
            name: "New list",
        });
    };

    const activeListId = useSelector(selectActiveList);

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = (
            <div className="lists-container">
                <ul className="list-scrollbar">
                    {lists.map((listId) => (
                        <li
                            key={listId}
                            className={`${activeListId === listId ? "active" : ""}`}
                        >
                            <List key={listId} listId={listId} />
                        </li>
                    ))}
                </ul>
                <button className="create-new-list" onClick={handleCreateNewList}>
                    <p className="icon">+</p> <p className="text">Create new list</p>
                </button>
            </div>
        );
    } else if (isError) {
        content = <p>{error.message}</p>;
    } else {
        content = <p>No data available.</p>;
    }

    return <section>{content}</section>;
}

export default Lists;
