import React, {Component} from 'react';
import {toast} from 'react-toastify';
import axios from "axios";
import PubSub from "pubsub-js";

import HandleError from "../../helpers/handle-error";
import CustomInput from "../../components/custom-input";
import CustomButton from "../../components/custom-button";

export class BookForm extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            price: '',
            authorId: '',
            loading: false
        };

        this.sendForm = this.sendForm.bind(this);
    }

    sendForm(event) {
        event.preventDefault();

        this.setState({loading: true});

        const data = {
            titulo: this.state.title,
            preco: this.state.price,
            autorId: this.state.authorId
        };

        PubSub.publish('clear-field');

        axios.post('http://cdc-react.herokuapp.com/api/livros', data)
            .then(response => {
                PubSub.publish('book:update-list', response.data);

                // Reset form
                this.setState({
                    title: '',
                    price: '',
                    authorId: '',
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
                    <CustomInput id="titulo" type="text" name="title" value={this.state.title}
                                 onChange={this.updateField.bind(this, 'title')}/>
                    <CustomInput id="preco" type="tel" name="price" value={this.state.price}
                                 onChange={this.updateField.bind(this, 'price')}/>

                    {/* TODO Create custom component */}
                    <div className="pure-control-group">
                        <label htmlFor="autorId">
                            Author
                        </label>

                        <select value={this.state.authorId} id="autorId" name="autorId" onChange={this.updateField.bind(this, 'authorId')}>
                            <option value="">Selecione</option>
                            {
                                this.props.authors.map((item) => {
                                    return <option key={item.id} value={item.id}>
                                        {item.nome}
                                    </option>;
                                })
                            }
                        </select>

                        <span className="error">
                            {this.state.error}
                        </span>
                    </div>

                    <CustomButton type="type" label="Save" loading={this.state.loading}/>

                </form>
            </div>
        );
    }
}