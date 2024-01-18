import {useDispatch, useSelector} from "react-redux";
import {selectListById} from "../../features/lists/listsSlice";
import {changeListChoice} from "../../features/chosenList/chosenListSlice";
import "./List.style.scss";

function List({listId}) {
    const dispatch = useDispatch();
    const list = useSelector((state) => selectListById(state, listId));

    const handleFilterChange = (listId) => {
        dispatch(changeListChoice(listId));
        console.log("button clicked");
    };

    return (
        <article onClick={() => handleFilterChange(listId)} className="list-container">
            <h1 className="list-name">{list.name}</h1>
        </article>
    );
}

export default List;
