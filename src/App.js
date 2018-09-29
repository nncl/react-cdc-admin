import React, {Component} from 'react';
import {ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './css/pure-min.css';
import './css/side-menu.css';

import {AuthorBox} from "./AuthorBox";

class App extends Component {

    render() {
        return (
            <div id="layout">
                <a href="#menu" id="menuLink" className="menu-link">
                    <span/>
                </a>
                <div id="menu">
                    <div className="pure-menu">
                        <a className="pure-menu-heading" href="#">Company</a>
                        <ul className="pure-menu-list">
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Author</a></li>
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Books</a></li>
                        </ul>
                    </div>
                </div>
                <div id="main">
                    <ToastContainer/>

                    <div className="header">
                        <h1>Authors Form</h1>
                    </div>

                    <div className="content" id="content">
                        <AuthorBox/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
