import React, {Component} from 'react';
import {ClipLoader} from 'react-spinners';

export class BookList extends Component {

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
                        <th>Title</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.results.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{item.titulo}</td>
                                    <td>{item.preco}</td>
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