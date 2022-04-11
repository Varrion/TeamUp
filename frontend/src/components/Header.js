import React, {useEffect, useState} from "react";
import {Nav, Navbar} from "react-bootstrap";
import Logo from "../assets/images/TeamupTransparent.png";
import {isMobile} from 'react-device-detect';
import {Link, navigate} from "@reach/router";
import {useAuthContext} from "../configurations/AuthContext"
import Button from "@material-ui/core/Button";
import {Grid, Typography} from "@material-ui/core";
import AntSwitch from "./DarkModeButtonSwitch";
import {useToggleTheme} from "../configurations/MuiThemeContext";
import SunIcon from '@material-ui/icons/Brightness5';
import MoonIcon from '@material-ui/icons/Brightness3';

const Header = props => {
    const [background, setBackground] = useState("dark");
    const {loggedUser, logout} = useAuthContext();
    const {toggleDarkMode} = useToggleTheme();

    const toggleDarkModeFunc = darkModeToggle => {
        sessionStorage.setItem('preferDarkMode', !darkModeToggle);
        toggleDarkMode(darkModeToggle);
    }

    useEffect(() => {
        setBackground(props.isTransparent ?
            isMobile ? "dark"
                : window.scrollY < 750 ? "transparent"
                    : "dark"
            : "dark");

        const listenScrollEvent = event => {
            setBackground(props.isTransparent ?
                isMobile ? "dark"
                    : window.scrollY < 750 ? "transparent"
                        : "dark"
                : "dark");
        };

        window.addEventListener("scroll", listenScrollEvent);
        return () => window.removeEventListener("scroll", listenScrollEvent)
    }, [props.isTransparent, background])

    return <Navbar bg={background} fixed={!isMobile && "top"} sticky={(isMobile || !props.isTransparent) && "top"}
                   expand="lg" variant="dark">
        <img src={Logo} width={70} height={50} alt={"team-up"} className={"cursor-pointer ml-2 mr-2"}
             onClick={() => navigate("/")}/>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Link to={"/users"} className={"nav-link"}>Users</Link>
                <Link to={"/teams"} className={"nav-link"}>Teams</Link>
                <Link to={"/locations"} className={"nav-link"}>Our Locations</Link>
            </Nav>
            <Nav>
                <Typography component="div">
                    <Grid component="label" container alignItems="center" spacing={1}>
                        <Grid item><SunIcon/></Grid>
                        <Grid item>
                            <AntSwitch checked={sessionStorage.getItem("preferDarkMode") === 'true'}
                                       onChange={() => toggleDarkModeFunc(sessionStorage.getItem("preferDarkMode") === 'true')}
                                       name="checkedC"/>
                        </Grid>
                        <Grid item><MoonIcon color="inherit"/></Grid>
                    </Grid>
                </Typography>

                {!loggedUser ?
                    <>
                        <Link to={"/login"} className={"nav-link h6"}>LOGIN</Link>
                        <span className={"nav-link h6"}>/</span>
                        <Link to={"/register"} className={"nav-link h6 mr-3"}>REGISTER</Link>
                    </> :
                    <div className={"d-flex align-items-baseline"}>
                        <Link to={`/users/${loggedUser}`} className={"nav-link h6"}>
                            Welcome {loggedUser}
                        </Link>
                        <Button className={"nav-link h6"} onClick={logout}>logout</Button>
                    </div>
                }
            </Nav>
        </Navbar.Collapse>
    </Navbar>;
}

export default Header;
