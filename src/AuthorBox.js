import React, {Component} from 'react';
import {AuthorForm} from "./AuthorForm";
import {AuthorList} from "./AuthorList";
import axios from "axios";

export class AuthorBox extends Component {

    constructor() {
        super();
        this.state = {
            results: []
        };

        this.updateAuthorList = this.updateAuthorList.bind(this);
    }

    componentDidMount() {
        this.getAuthors();
    }

    getAuthors() {
        axios.get('http://cdc-react.herokuapp.com/api/autores')
            .then(response => this.setState({results: response.data}));
    }

    updateAuthorList(data) {
        this.setState({results: data})
    }

    render() {
        return (
            <div>
                <AuthorForm callbackUpdateAuthorList={this.updateAuthorList}/>
                <AuthorList results={this.state.results}/>
            </div>
        );
    }
}