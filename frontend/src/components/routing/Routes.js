import {Redirect, Router} from "@reach/router";
import Route from "./Route";
import Home from "../../pages/Home";
import Register from "../../pages/user/Register";
import Login from "../../pages/user/Login";
import Profile from "../../pages/user/Profile";
import React from "react";
import UserList from "../../pages/user/UserList";
import TeamList from "../../pages/team/TeamList";
import TeamDetails from "../../pages/team/TeamDetails";

const Routes = () => {
    return <Router>
        <Route path={"/"}>
            <Home path={"/"}/>
            <Register path={"/register"}/>
            <Login path={"/login"}/>
            <Redirect from={"*"} to={"/"} noThrow/>
        </Route>
        <Route container={true} path={"/users"}>
            <UserList path={"/"}/>
            <Profile path={":username"}/>
        </Route>
        <Route container={true} path={"/teams"}>
            <TeamList path={"/"}/>
            <TeamDetails path={":id"}/>
        </Route>
    </Router>
}

export default Routes;
