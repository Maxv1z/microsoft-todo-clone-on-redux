import {Routes, Route, Outlet} from "react-router";
import TodoList from "./components/Todos/TodoList";
import Lists from "./components/Lists/Lists";

import {Provider} from "react-redux";
import {store} from "./app/store";

function App() {
    return (
        <Provider store={store}>
            <TodoList />
            <Lists />
        </Provider>
    );
}

export default App;
