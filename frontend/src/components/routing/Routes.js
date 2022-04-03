import {Redirect, Router} from "@reach/router";
import Route from "./Route";
import Home from "../../pages/Home";
import Register from "../../pages/user/Register";
import Login from "../../pages/user/Login";
import Profile from "../../pages/user/Profile";
import UsersPage from "../../pages/user/UsersPage";
import TeamDetails from "../../pages/team/TeamDetails";
import LocationDetails from "../../pages/location/LocationDetails";
import LocationList from "../../pages/location/LocationList";
import TerrainDetails from "../../pages/terrain/TerrainDetails";
import TeamsPage from "../../pages/team/TeamsPage";

const Routes = () => {
    return <Router>
        <Route path={"/"}>
            <Home path={"/"}/>
            <Register path={"/register"}/>
            <Login path={"/login"}/>
            <Redirect from={"*"} to={"/"} noThrow/>
        </Route>
        <Route container={true} path={"/users"}>
            <UsersPage path={"/"}/>
            <Profile path={":username"}/>
        </Route>
        <Route container={true} path={"/teams"}>
            <TeamsPage path={"/"}/>
            <TeamDetails path={":id"}/>
        </Route>
        <Route container={true} path={"/locations"}>
            <LocationList path={"/"}/>
            <LocationDetails path={":id"}/>
        </Route>
        <Route container={true} path={"/terrains"}>
            <TerrainDetails path={":id"}/>
        </Route>
    </Router>
}

export default Routes;
