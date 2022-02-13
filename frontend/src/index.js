import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Global.css';
import axios from "axios";
import {ToastProvider} from "react-toast-notifications";
import CustomThemeProvider from "./configurations/MuiThemeContext";

const credentials = sessionStorage.getItem("authData");

axios.defaults.baseURL = 'http://localhost:8080/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
if (credentials) {
    axios.defaults.headers.common['Authorization'] = credentials;
}

ReactDOM.render(
    <CustomThemeProvider>
        <ToastProvider autoDismiss autoDismissTimeout={4000} placement={"bottom-right"}>
            <App/>
        </ToastProvider>
    </CustomThemeProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
