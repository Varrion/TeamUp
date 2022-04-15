import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dropzone-uploader/dist/styles.css'
import './styles/Global.css';
import axios from "axios";
import {ToastProvider} from "react-toast-notifications";
import CustomThemeProvider from "./configurations/MuiThemeContext";
import {navigate} from "@reach/router";

const credentials = JSON.parse(sessionStorage.getItem("authData"));

axios.defaults.baseURL = 'http://localhost:8080/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
if (credentials) {
    axios.defaults.headers.common['Authorization'] = credentials.userCredential;
}

axios.interceptors.response.use((response) => {
    return response;
}, function (error) {
    // Do something with response error
    if (error.response.status === 404) {
        console.log('unauthorized, logging out ...');
        navigate('/');
    }
    return Promise.reject(error.response);
});

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
