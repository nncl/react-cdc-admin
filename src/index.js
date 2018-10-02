import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {AuthorBox} from "./AuthorBox";

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path='/' component={App}/>
            <Route path='/author' component={AuthorBox}/>
            <Route path='/book' component={App}/>
        </Switch>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
