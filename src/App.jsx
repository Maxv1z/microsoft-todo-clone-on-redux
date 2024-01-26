import {Routes, Route, Outlet} from "react-router";
import {useState, useEffect} from "react";
import "./app.css";
import "./antd-rewrited-styles.scss";
import Home from "./components/Home/Home";
import Lists from "./components/Lists/Lists";

import {Provider} from "react-redux";
import {store} from "./app/store";

function App() {
    const [isPhone, setIsPhone] = useState(window.innerWidth < 1440);

    useEffect(() => {
        const handleResize = () => {
            setIsPhone(window.innerWidth < 1440);
        };

        window.addEventListener("resize", handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <Provider store={store}>
            <Routes>
                {isPhone ? (
                    <Route index element={<Lists />} />
                ) : (
                    <Route index element={<Home />} />
                )}
            </Routes>
        </Provider>
    );
}

export default App;
