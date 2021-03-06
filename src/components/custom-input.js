import React, {Component} from "react";
import PubSub from "pubsub-js";

export default class CustomInput extends Component {

    constructor() {
        super();
        this.state = {error: null};
    }

    componentDidMount() {
        this.subscribeIntoEvents();
    }

    subscribeIntoEvents() {
        PubSub.subscribe('error:validation', (topic, error) => {
            if (error.field == this.props.id) this.setState({error: error['defaultMessage']});
        });

        PubSub.subscribe('clear-field', () => this.setState({error: null}));
    }

    render() {
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>
                    {this.props.name}
                </label>

                <input {...this.props}/>

                <span className="error">
                    {this.state.error}
                </span>
            </div>
        )
    }
}