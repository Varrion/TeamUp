import './App.css';
import Header from "./components/Header";
import {Match} from "@reach/router";
import React, {Suspense} from "react";
import {CircularProgress} from "@material-ui/core";
import Footer from "./components/Footer";
import {AuthProvider} from "./configurations/AuthContext";
import Routes from "./components/routing/Routes";

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
                <Routes/>
            </Suspense>
            <Match path="/">
                {(props) => props.match
                    ? <Footer show={true}/>
                    : <Footer show={false}/>
                }
            </Match>

            <Match path="/sportsman">
                {(props) => props.match
                    ? <Footer show={true}/>
                    : <Footer show={false}/>
                }
            </Match>

            <Match path="/location-owner">
                {(props) => props.match
                    ? <Footer show={true}/>
                    : <Footer show={false}/>
                }
            </Match>
        </AuthProvider>
    );
}

export default App;
