import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import propTypes from 'prop-types';
import InfoIcon from '../../../assets/img/icons/ic_info.svg';

@inject('componentStore')
@inject('questionStore')
@observer
class QuestionField extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentValue: props.questionStore.questions[props.currentQuestionIndex][props.name],
            setQuestionProperty: props.questionStore.setQuestionProperty,
            questions: props.questionStore.questions,
            requiredErrorMessage: props.questionStore.requiredErrorMessage
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentQuestionIndex !== this.props.currentQuestionIndex
            || prevProps.currentQuestionsLength !== this.props.currentQuestionsLength) {
            this.setState({
                currentValue: this.state.questions[this.props.currentQuestionIndex][this.props.name]
            });
        }
    }

    handleChange = (event) => {
        if (this.props.isRequired && event.target.value.length <= 0) {
            this.props.questionStore.errors[this.props.currentQuestionIndex]
                .set(this.props.name, this.state.requiredErrorMessage);
        } else {
            if (this.props.pattern !== undefined && !this.props.pattern.test(event.target.value)) {
                this.props.questionStore.errors[this.props.currentQuestionIndex]
                    .set(this.props.name, `* invalid value (${this.props.patternExplanation})`);
            } else {
                this.props.questionStore.errors[this.props.currentQuestionIndex].delete(this.props.name);
            }
        }

        this.state.setQuestionProperty({
            index: this.props.currentQuestionIndex,
            propertyName: this.props.name,
            propertyValue: event.target.value
        });
        this.setState({
            currentValue: event.target.value
        });
    };

    render() {
        return (
            <label className="question-window__question-field">
                <span>{this.props.name}</span>
                <input type="text" className="form-control" value={this.state.currentValue === undefined ? '' : this.state.currentValue}
                       onChange={this.handleChange} required={this.props.isRequired}/>
                <img src={InfoIcon} className="question-window_icon" alt="Info" title={this.props.helpLine}/>
                <span className="question-window__question-field_error">{
                    this.props.questionStore.errors[this.props.currentQuestionIndex].get(this.props.name)
                }</span>
            </label>
        )
    }
}

QuestionField.propTypes = {
    name: propTypes.string.isRequired,
    isRequired: propTypes.bool,
    isArray: propTypes.bool,

    //can't use just componentStore because this component doesn't update when currentQuestionIndex updates
    currentQuestionIndex: propTypes.number.isRequired,
    //is needed to know if questionList changed
    currentQuestionsLength: propTypes.number.isRequired
};

export default QuestionField;