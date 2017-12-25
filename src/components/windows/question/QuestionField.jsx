import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import propTypes from 'prop-types';
import InfoIcon from '../../../assets/img/icons/ic_help.svg';
import Tooltip from '../../ui/Tooltip';

@inject('questionStore')
@observer
class QuestionField extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentValue: props.questionStore.questions[props.currentQuestionIndex][props.name],
            setQuestionProperty: props.questionStore.setQuestionProperty,
            questions: props.questionStore.questions,
            errors: props.questionStore.errors,
            isIdUnique: props.questionStore.isIdUnique,
            requiredErrorMessage: props.questionStore.requiredErrorMessage,
            invalidIdErrorMessage: props.questionStore.invalidIdErrorMessage
        }
    }

    componentDidUpdate(prevProps) {
        const currentValue = this.state.questions[this.props.currentQuestionIndex][this.props.name];

        if (prevProps.currentQuestionIndex !== this.props.currentQuestionIndex
            || prevProps.currentQuestionsLength !== this.props.currentQuestionsLength) {
            this.setState({currentValue});
            this.handleChange({target: {value: currentValue || ''}});
        }
    }

    handleChange = (event) => {
        if (this.props.isRequired && event.target.value.length <= 0) {
            this.state.errors[this.props.currentQuestionIndex].set(this.props.name, this.state.requiredErrorMessage);
        } else {
            if (this.props.pattern !== undefined && !this.props.pattern.test(event.target.value)) {
                this.state.errors[this.props.currentQuestionIndex].set(this.props.name,
                    `* invalid value (${this.props.patternExplanation})`);
            } else {
                this.state.errors[this.props.currentQuestionIndex].delete(this.props.name);
            }
        }

        const prevValue = this.state.currentValue;

        this.state.setQuestionProperty({
            index: this.props.currentQuestionIndex,
            propertyName: this.props.name,
            propertyValue: event.target.value
        });
        this.setState({
            currentValue: event.target.value
        });

        if (this.props.name === 'TAQuestionName' || this.props.name === 'TAModelNo') {
            this.checkIdUniqueness({currentValue: event.target.value, prevValue});
        }
    };

    checkIdUniqueness({currentValue, prevValue}) {
        const currentName = this.state.questions[this.props.currentQuestionIndex].TAQuestionName;
        const currentModel = this.state.questions[this.props.currentQuestionIndex].TAModelNo;

        if (currentValue && !this.state.isIdUnique({
                questionIndex: this.props.currentQuestionIndex,
                TAQuestionName: this.props.name === 'TAQuestionName'
                    ? currentValue
                    : currentName,
                TAModelNo: this.props.name === 'TAModelNo'
                    ? currentValue
                    : currentModel,
            })) {
            const prevNameError = this.state.errors[this.props.currentQuestionIndex].get('TAQuestionName');
            const prevModelError = this.state.errors[this.props.currentQuestionIndex].get('TAModelNo');

            if (prevNameError !== this.state.invalidIdErrorMessage) {
                this.state.errors[this.props.currentQuestionIndex].set('TAQuestionName2', prevNameError);
            }
            if (prevModelError !== this.state.invalidIdErrorMessage) {
                this.state.errors[this.props.currentQuestionIndex].set('TAModelNo2', prevModelError);
            }

            this.state.errors[this.props.currentQuestionIndex].set('TAQuestionName', this.state.invalidIdErrorMessage);
            this.state.errors[this.props.currentQuestionIndex].set('TAModelNo', this.state.invalidIdErrorMessage);
        } else {
            this.returnPrevError({questionIndex: this.props.currentQuestionIndex});

            const questionsWithSameId = this.state.questions.filter((item, index) =>
                (index !== this.props.currentQuestionIndex &&
                    ((this.props.name === 'TAQuestionName' && item.TAQuestionName === prevValue)
                        || (this.props.name !== 'TAQuestionName' && item.TAQuestionName === currentName))
                    && ((this.props.name === 'TAModelNo' && item.TAModelNo === prevValue)
                        || (this.props.name !== 'TAModelNo' && item.TAModelNo === currentModel))
                ));

            if (questionsWithSameId.length === 1) {
                this.returnPrevError({questionIndex: this.state.questions.indexOf(questionsWithSameId[0])});
            }
        }
    }

    returnPrevError({questionIndex}) {
        const prevNameError = this.state.errors[questionIndex].get('TAQuestionName2');
        const prevModelError = this.state.errors[questionIndex].get('TAModelNo2');

        const currentNameError = this.state.errors[questionIndex].get('TAQuestionName');
        const currentModelError = this.state.errors[questionIndex].get('TAModelNo');

        if (currentNameError && currentNameError === this.state.invalidIdErrorMessage) {
            this.state.errors[questionIndex].set('TAQuestionName', prevNameError);
        }
        if (!this.state.errors[questionIndex].get('TAQuestionName')) {
            this.state.errors[questionIndex].delete('TAQuestionName');
        }
        if (currentModelError && currentModelError === this.state.invalidIdErrorMessage) {
            this.state.errors[questionIndex].set('TAModelNo', prevModelError);
        }
        if (!this.state.errors[questionIndex].get('TAModelNo')) {
            this.state.errors[questionIndex].delete('TAModelNo');
        }

        this.state.errors[questionIndex].delete('TAQuestionName2');
        this.state.errors[questionIndex].delete('TAModelNo2');
    }

    render() {
        return (
            //TODO: extract tooltip with icon to separate component
            <label className="question-window__question-field">
                <Tooltip events delay={100} />

                <span>{this.props.name}</span>
                <input type="text" className="form-control" value={this.state.currentValue === undefined ? '' : this.state.currentValue}
                       onChange={this.handleChange} required={this.props.isRequired}/>
                <img src={InfoIcon} className="question-window_icon" alt="Help"  data-rh={this.props.helpLine} data-rh-at="right"/>
                <span className="question-window__question-field_error">{
                    this.state.errors[this.props.currentQuestionIndex].get(this.props.name)
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