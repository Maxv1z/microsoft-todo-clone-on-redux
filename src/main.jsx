import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {BrowserRouter} from "react-router-dom";

import {store} from "./app/store.js";
import {ApiProvider} from "@reduxjs/toolkit/query/react";
import {apiSlice} from "./api/apiSlice.js";
import {extendedApiSlice} from "./features/todos/todosSlice.js";
import {listsApiSlice} from "./features/lists/listsSlice.js";

store.dispatch(extendedApiSlice.endpoints.getTodos.initiate());
store.dispatch(extendedApiSlice.endpoints.getLists.initiate());

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <ApiProvider api={apiSlice}>
                <App />
            </ApiProvider>
        </BrowserRouter>
    </React.StrictMode>
);
