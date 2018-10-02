import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './Home';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {AuthorBox} from "./AuthorBox";

ReactDOM.render(
    <Router>
        <App>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/author' component={AuthorBox}/>
                <Route path='/book' component={App}/>
                <Redirect from='*' to='/'/>
            </Switch>
        </App>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
