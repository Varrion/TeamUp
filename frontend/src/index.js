import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Global.css';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import axios from "axios";
import {ToastProvider} from "react-toast-notifications";

const THEME = createMuiTheme({
    typography: {
        h3: {
            fontFamily: ["Trirong", "serif"].join(','),
            textTransform: "uppercase",
            fontStyle: "oblique",
            fontWeight: "bold"
        }
    }
});

const credentials = sessionStorage.getItem("authData");

axios.defaults.baseURL = 'http://localhost:8080/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
if (credentials) {
    axios.defaults.headers.common['Authorization'] = credentials;
}

ReactDOM.render(
    <MuiThemeProvider theme={THEME}>
        <ToastProvider autoDismiss autoDismissTimeout={4000} placement={"bottom-right"}>
            <App/>
        </ToastProvider>
    </MuiThemeProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
