import React, { Component } from 'react';

class InlineEditableText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
        }

        this.handleTextClick = this.handleTextClick.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.handleEnterUp = this.handleEnterUp.bind(this);
    }

    render() {
        if(this.state.edit) {
            return(<input type='text' autoFocus
                defaultValue={this.props.text} 
                onBlur={this.handleOnBlur} 
                onKeyUp={this.handleEnterUp}
            />)
        } else {
            return(<div onClick={this.handleTextClick}>{this.props.text}</div>)
        }
    }

    handleOnBlur(e) {
        this.props.onEditComplete(
            {
                id: this.props.id, 
                newText: e.target.value
            }
        );    
        this.setState({edit:false})
    }

    handleTextClick() {
        this.setState({edit: true});
    }
    
    handleEnterUp(e) {
        if(e.keyCode === 13) {
            this.handleOnBlur(e);
        }
    }
}
export default InlineEditableText 