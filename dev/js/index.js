/**
 * Created by William on 02/06/2017.
 */

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import {HashRouter, BrowserRouter} from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';


ReactDOM.render(<CookiesProvider><HashRouter><App /></HashRouter></CookiesProvider>, document.getElementById("root"));