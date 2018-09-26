import React, {Component} from 'react';
import axios from 'axios'
import './App.css';
import './css/pure-min.css';
import './css/side-menu.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
            results: [],
            name: '',
            email: '',
            password: ''
        };

        this.sendForm = this.sendForm.bind(this);
        this.setName = this.setName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }

    componentDidMount() {
        this.getAuthors();
    }

    getAuthors() {
        axios.get('http://cdc-react.herokuapp.com/api/autores')
            .then(response => this.setState({results: response.data}));
    }

    sendForm(event) {
        event.preventDefault();

        const data = {
            nome: this.state.name,
            email: this.state.email,
            senha: this.state.password
        };

        axios.post('http://cdc-react.herokuapp.com/api/autores', data)
            .then(response => this.setState({results: response.data}))
            .catch(err => console.error(err));
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
                    <div className="header">
                        <h1>Authors Form</h1>
                    </div>
                    <div className="content" id="content">
                        <div className="pure-form pure-form-aligned">
                            <form className="pure-form pure-form-aligned" onSubmit={this.sendForm}>
                                <div className="pure-control-group">
                                    <label htmlFor="nome">Nome</label>
                                    <input id="nome" type="text" name="nome" value={this.state.name}
                                           onChange={this.setName}/>
                                </div>
                                <div className="pure-control-group">
                                    <label htmlFor="email">Email</label>
                                    <input id="email" type="email" name="email" value={this.state.email}
                                           onChange={this.setEmail}/>
                                </div>
                                <div className="pure-control-group">
                                    <label htmlFor="senha">Senha</label>
                                    <input id="senha" type="password" name="senha" value={this.state.password}
                                           onChange={this.setPassword}/>
                                </div>
                                <div className="pure-control-group">
                                    <label></label>
                                    <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                                </div>
                            </form>

                        </div>
                        <div>
                            <table className="pure-table">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>E-mail</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.results.map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{item.nome}</td>
                                                <td>{item.email}</td>
                                            </tr>
                                        );
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
