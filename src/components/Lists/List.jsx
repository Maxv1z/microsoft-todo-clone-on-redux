import {useDispatch, useSelector} from "react-redux";
import {selectListById} from "../../features/lists/listsSlice";
import {changeListChoice} from "../../features/chosenList/chosenListSlice";

function List({listId}) {
    const dispatch = useDispatch();
    const list = useSelector((state) => selectListById(state, listId));

    const handleFilterChange = (listId) => {
        dispatch(changeListChoice(listId));
        console.log("button clicked");
    };

    return (
        <article>
            <h1 onClick={() => handleFilterChange(listId)}>{list.name}</h1>
        </article>
    );
}

export default List;
