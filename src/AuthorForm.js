import React, {Component} from 'react';
import {toast} from 'react-toastify';
import axios from "axios";
import PubSub from "pubsub-js";

import HandleError from "./helpers/handle-error";
import CustomInput from "./components/custom-input";
import CustomButton from "./components/custom-button";

export class AuthorForm extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            loading: false
        };

        this.sendForm = this.sendForm.bind(this);
    }

    sendForm(event) {
        event.preventDefault();

        this.setState({loading: true});

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
                    password: '',
                    loading: false
                });

                toast.success(response.statusText, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
            .catch(err => {
                this.setState({loading: false});
                if (err.response.data['errors']) new HandleError().publishError(err.response.data['errors']);
            });
    }

    updateField(field, event) {
        const obj = {};
        obj[field] = event.target.value;
        this.setState(obj);
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.sendForm}>
                    <CustomInput id="nome" type="text" name="name" value={this.state.name}
                                 onChange={this.updateField.bind(this, 'name')}/>
                    <CustomInput id="email" type="email" name="email" value={this.state.email}
                                 onChange={this.updateField.bind(this, 'email')}/>
                    <CustomInput id="senha" type="password" name="password" value={this.state.password}
                                 onChange={this.updateField.bind(this, 'password')}/>

                    <CustomButton type="type" label="Save" loading={this.state.loading}/>

                </form>
            </div>
        );
    }
}