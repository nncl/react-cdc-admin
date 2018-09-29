import React, {Component} from "react";
import LaddaButton, { S, SLIDE_UP } from 'react-ladda';

export default class CustomButton extends Component {
    render() {
        return (
            <div className="pure-control-group">
                <label></label>
                <LaddaButton
                    loading={this.props.loading}
                    data-color="#eee"
                    data-size={S}
                    data-style={SLIDE_UP}
                    data-spinner-size={30}
                    data-spinner-color="#ddd"
                    data-spinner-lines={12}
                >
                    Save
                </LaddaButton>
            </div>
        )
    }
}