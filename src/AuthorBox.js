import React, {Component} from 'react';
import {AuthorForm} from "./AuthorForm";
import {AuthorList} from "./AuthorList";
import axios from "axios";
import PubSub from "pubsub-js";

export class AuthorBox extends Component {

    constructor() {
        super();
        this.state = {
            results: []
        };
    }

    componentDidMount() {
        this.getAuthors();

        PubSub.subscribe('author:update-list', (topic, results) => {
            this.setState({results: results})
        });
    }

    getAuthors() {
        axios.get('http://cdc-react.herokuapp.com/api/autores')
            .then(response => this.setState({results: response.data}));
    }

    render() {
        return (
            <div>
                <AuthorForm/>
                <AuthorList results={this.state.results}/>
            </div>
        );
    }
}