import "./app.css";
import "./antd-rewrited-styles.scss";
import {Provider} from "react-redux";

import Home from "./components/Home/Home";
import {store} from "./app/store";

function App() {
    return (
        <Provider store={store}>
            <Home />
        </Provider>
    );
}

export default App;
