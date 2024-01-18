import {useSelector} from "react-redux";
import List from "./List";

import {useGetListsQuery, selectListsIds} from "../../features/lists/listsSlice";

function Lists() {
    const {isLoading, isSuccess, isError, error} = useGetListsQuery();
    const lists = useSelector(selectListsIds);

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = lists.map((listId) => <List key={listId} listId={listId} />);
    } else if (isError) {
        content = <p>{error.message}</p>;
    } else {
        content = <p>No data available.</p>;
    }

    return <section>{content}</section>;
}

export default Lists;
