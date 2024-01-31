import {useDispatch, useSelector} from "react-redux";
import List from "./List";
import {nanoid} from "nanoid";

import "./Lists.style.scss";

import {
    useGetListsQuery,
    selectListsIds,
    useAddListMutation,
} from "../../features/lists/listsSlice";

import {selectActiveList} from "../../features/chosenList/chosenListSlice";
import {
    selectSearchText,
    changeSearchState,
    changeIsSearch,
} from "../../features/search/searchingSlice";

function Lists() {
    const dispatch = useDispatch();

    let content; // for different cases of fetching
    const {isLoading, isSuccess, isError, error} = useGetListsQuery();

    const [addList] = useAddListMutation();

    const lists = useSelector(selectListsIds);
    const activeListId = useSelector(selectActiveList);
    const searchText = useSelector(selectSearchText);

    // searching field function
    const handleSearchInputChange = (e) => {
        const inputValue = e.target.value;
        // enable search on typing
        if (inputValue.trim() == "") {
            dispatch(changeIsSearch(false));
            dispatch(changeSearchState(""));
        } else {
            dispatch(changeSearchState(inputValue));
            dispatch(changeIsSearch(true));
        }
    };

    const handleCreateNewList = (e) => {
        e.preventDefault();
        addList({
            id: nanoid(),
            name: "New list",
        });
    };

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = (
            <div className="lists-container">
                <input
                    type="text"
                    placeholder="Search your todos..."
                    value={searchText}
                    onChange={handleSearchInputChange}
                    className="search-input"
                />
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
