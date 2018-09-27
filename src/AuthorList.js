import React, {Component} from 'react';

export class AuthorList extends Component {

    render() {
        return (
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