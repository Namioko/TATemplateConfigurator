import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import PropTypes from 'prop-types';
import InfoIcon from '../../../assets/img/icons/ic_info.svg';

@inject('questionStore')
@observer
class QuestionField extends Component { //TODO: extract error
    constructor(props) {
        super(props);

        this.state = {
            currentValue: this.props.questionStore.questions[this.props.currentQuestionIndex][this.props.name],
            error: '',
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentQuestionIndex !== this.props.currentQuestionIndex) {
            this.setState({
                currentValue: this.props.questionStore.questions[this.props.currentQuestionIndex][this.props.name],
                error: ''
            });
        }
    }

    handleChange = (event) => {
        if(this.props.pattern === undefined
            || (this.props.pattern !== undefined && this.props.pattern.test(event.target.value))) {
            this.props.questionStore.setQuestionProperty({
                index: this.props.currentQuestionIndex,
                propertyName: this.props.name,
                propertyValue: event.target.value
            });
            this.setState({
                currentValue: event.target.value,
                error: ''
            });
        } else {
            this.setState({error: '* invalid value'});
        }
    };

    render() {
        return (
            <label className="question-window__question-field">
                <span>{this.props.name}</span>
                <input type="text" className="form-control" value={this.state.currentValue === undefined ? '' : this.state.currentValue}
                       onChange={this.handleChange} required={this.props.isRequired}/>
                <img src={InfoIcon} className="question-window_icon" alt="Info" title={this.props.helpLine}/>
                <span className="question-window__question-field_error">{this.state.error}</span>
            </label>
        )
    }
}

QuestionField.PropTypes = {
    name: PropTypes.string.isRequired,
    isRequired: PropTypes.bool,
    isArray: PropTypes.bool,
    defaultValue: PropTypes.string,
    pattern: PropTypes.string,

    //can't use just componentStore because this component doesn't update when currentQuestionIndex updates
    currentQuestionIndex: PropTypes.string.isRequired
};

export default QuestionField;