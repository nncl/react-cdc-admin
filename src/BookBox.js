import React, {Component} from 'react';
import {BookForm} from "./components/book/BookForm";
import {BookList} from "./components/book/BookList";
import axios from "axios";
import PubSub from "pubsub-js";

export class BookBox extends Component {

    constructor() {
        super();
        this.state = {
            results: [],
            authors: [],
            loading: false
        };
    }

    componentDidMount() {
        this.getAuthors();
        this.getBooks();

        this.setState({loading: true});

        PubSub.subscribe('book:update-list', (topic, results) => {
            this.setState({results: results})
        });
    }

    getAuthors() {
        axios.get('http://cdc-react.herokuapp.com/api/autores')
            .then(response => this.setState({authors: response.data, loading: false}))
            .catch(() => this.setState({loading: false}));
    }

    getBooks() {
        axios.get('http://cdc-react.herokuapp.com/api/livros')
            .then(response => this.setState({results: response.data, loading: false}))
            .catch(() => this.setState({loading: false}));
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>Book Form</h1>
                </div>

                <BookForm authors={this.state.authors}/>
                <BookList results={this.state.results} loading={this.state.loading}/>
            </div>
        );
    }
}