import React, {Component} from 'react';
import {ClipLoader} from 'react-spinners';

export class AuthorList extends Component {

    render() {
        return (
            <div>
                <ClipLoader
                    sizeUnit={"px"}
                    color={'#123abc'}
                    loading={this.props.loading}/>

                <table className="pure-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>E-mail</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.results.map((item, i) => {
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
        );
    };
}