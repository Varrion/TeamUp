import React, {useEffect, useState} from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import Logo from "../assets/images/TeamupTransparent.png";
import {isMobile} from 'react-device-detect';
import {Link, navigate} from "@reach/router";
import {useAuthContext} from "./AuthContext"
import Button from "@material-ui/core/Button";

const Header = props => {
    const [background, setBackground] = useState("dark");
    const {loggedUser, logout} = useAuthContext();

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
                <Nav.Link href="#pricing">Pricing</Nav.Link>
                <NavDropdown title="Dropdown" id={"header-dropdown"}>
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Nav>
                {!loggedUser ?
                    <>
                        <Link to={"/login"} className={"nav-link h6"}>LOGIN</Link>
                        <span className={"nav-link h6"}>/</span>
                        <Link to={"/register"} className={"nav-link h6 mr-3"}>REGISTER</Link>
                    </> :
                    <>
                        <Link to={`/users/${loggedUser}`} className={"nav-link h6"}>
                            Welcome {loggedUser}
                        </Link>
                        <Button onClick={logout}>logout</Button>
                    </>
                }
            </Nav>
        </Navbar.Collapse>
    </Navbar>;
}

export default Header;
