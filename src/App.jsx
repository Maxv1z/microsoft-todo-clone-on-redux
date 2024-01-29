import {Routes, Route, Outlet} from "react-router";
import "./app.css";
import "./antd-rewrited-styles.scss";
import Home from "./components/Home/Home";

import {Provider} from "react-redux";
import {store} from "./app/store";

function App() {
    return (
        <Provider store={store}>
            <Routes>
                <Route index element={<Home />} />
            </Routes>
        </Provider>
    );
}

export default App;
