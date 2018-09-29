import React, {Component} from 'react';
import HandleError from "./helpers/handle-error";
import CustomInput from "./components/custom-input";
import CustomButton from "./components/custom-button";
import axios from "axios";
import PubSub from "pubsub-js";

export class AuthorForm extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: ''
        };

        this.sendForm = this.sendForm.bind(this);
        this.setName = this.setName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }

    sendForm(event) {
        event.preventDefault();

        const data = {
            nome: this.state.name,
            email: this.state.email,
            senha: this.state.password
        };

        PubSub.publish('clear-field');

        axios.post('http://cdc-react.herokuapp.com/api/autores', data)
            .then(response => {
                PubSub.publish('author:update-list', response.data);

                // Reset form
                this.setState({
                    name: '',
                    email: '',
                    password: ''
                });
            })
            .catch(err => {
                if (err.response.data['errors']) new HandleError().publishError(err.response.data['errors']);
            });
    }

    setName(event) {
        this.setState({name: event.target.value});
    }

    setEmail(event) {
        this.setState({email: event.target.value});
    }

    setPassword(event) {
        this.setState({password: event.target.value});
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.sendForm}>
                    <CustomInput id="nome" type="text" name="nome" value={this.state.name}
                                 onChange={this.setName}/>
                    <CustomInput id="email" type="email" name="email" value={this.state.email}
                                 onChange={this.setEmail}/>
                    <CustomInput id="senha" type="password" name="password" value={this.state.password}
                                 onChange={this.setPassword}/>

                    <CustomButton type="type" label="Save"/>

                </form>
            </div>
        );
    }
}