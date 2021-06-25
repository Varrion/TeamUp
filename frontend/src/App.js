import './App.css';
import Header from "./components/Header";
import Home from "./pages/Home";
import {Match, Router} from "@reach/router";
import Register from "./pages/user/Register";
import React, {Suspense} from "react";
import {CircularProgress} from "@material-ui/core";
import Login from "./pages/user/Login";
import Footer from "./components/Footer";
import Profile from "./pages/user/Profile";
import Route from "./components/Route";
import {AuthProvider} from "./components/AuthContext";

const App = props => {
    return (
        <AuthProvider>
            <Match path="/">
                {(props) => props.match
                    ? <Header isTransparent={true}/>
                    : <Header isTransparent={false}/>
                }
            </Match>
            <Suspense fallback={<CircularProgress/>}>
                <Router>
                    <Route path={"/"}>
                        <Home path={"/"}/>
                        <Register path={"/register"}/>
                        <Login path={"/login"}/>
                    </Route>
                    <Route container={true} path={"/user"}>
                        <Profile path={"/"}/>
                    </Route>
                </Router>
            </Suspense>
            <Match path="/">
                {(props) => props.match
                    ? <Footer show={true}/>
                    : <Footer show={false}/>
                }
            </Match>
        </AuthProvider>
    );
}

export default App;
