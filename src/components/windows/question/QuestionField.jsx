import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import propTypes from 'prop-types';
import InfoIcon from '../../../assets/img/icons/ic_help.svg';
import Tooltip from '../../ui/Tooltip';
import {INVALID_ID_ERROR_MESSAGE, REQUIRED_ERROR_MESSAGE} from '../../../constants';

@inject('questionStore')
@observer
class QuestionField extends Component {
    constructor(props) {
        super(props);

        const {questionStore, currentQuestionIndex, name} = props;

        this.state = {
            currentValue: questionStore.questions[currentQuestionIndex][name]
        }
    }

    componentDidUpdate(prevProps) {
        const {currentQuestionIndex, currentQuestionsLength, name, questionStore} = this.props;
        const {questions} = questionStore;

        const currentValue = questions[currentQuestionIndex][name];

        if (prevProps.currentQuestionIndex !== currentQuestionIndex
            || prevProps.currentQuestionsLength !== currentQuestionsLength) {
            this.setState({currentValue});
            this.handleChange({target: {value: currentValue || ''}});
        }
    }

    handleChange = (event) => {
        const {
            currentQuestionIndex,
            name,
            isRequired,
            pattern,
            patternExplanation,
            questionStore
        } = this.props;
        const {setQuestionProperty, errors} = questionStore;

        const currentError = errors[currentQuestionIndex];

        if (isRequired && event.target.value.length <= 0) {
            currentError.set(name, REQUIRED_ERROR_MESSAGE);
        } else {
            if (pattern !== undefined && !pattern.test(event.target.value)) {
                currentError.set(name, `* invalid value (${patternExplanation})`);
            } else {
                currentError.delete(name);
            }
        }

        const prevValue = this.state.currentValue;

        setQuestionProperty({
            index: currentQuestionIndex,
            propertyName: name,
            propertyValue: event.target.value
        });

        this.setState({
            currentValue: event.target.value
        });

        if (name === 'TAQuestionName' || name === 'TAModelNo') {
            this.checkIdUniqueness({currentValue: event.target.value, prevValue});
        }
    };

    checkIdUniqueness({currentValue, prevValue}) {
        const {currentQuestionIndex, name, questionStore} = this.props;
        const {isIdUnique, questions, errors} = questionStore;

        const currentName = questions[currentQuestionIndex].TAQuestionName;
        const currentModel = questions[currentQuestionIndex].TAModelNo;
        const currentError = errors[currentQuestionIndex];

        if (currentValue && !isIdUnique({
                questionIndex: currentQuestionIndex,
                TAQuestionName: name === 'TAQuestionName'
                    ? currentValue
                    : currentName,
                TAModelNo: name === 'TAModelNo'
                    ? currentValue
                    : currentModel,
            })) {
            const prevNameError = currentError.get('TAQuestionName');
            const prevModelError = currentError.get('TAModelNo');

            if (prevNameError !== INVALID_ID_ERROR_MESSAGE) {
                currentError.set('TAQuestionName2', prevNameError);
            }
            if (prevModelError !== INVALID_ID_ERROR_MESSAGE) {
                currentError.set('TAModelNo2', prevModelError);
            }

            currentError.set('TAQuestionName', INVALID_ID_ERROR_MESSAGE);
            currentError.set('TAModelNo', INVALID_ID_ERROR_MESSAGE);
        } else {
            this.returnPrevError({questionIndex: currentQuestionIndex});

            const questionsWithSameId = questions.filter((item, index) =>
                (index !== currentQuestionIndex &&
                    ((name === 'TAQuestionName' && item.TAQuestionName === prevValue)
                        || (name !== 'TAQuestionName' && item.TAQuestionName === currentName))
                    && ((name === 'TAModelNo' && item.TAModelNo === prevValue)
                        || (name !== 'TAModelNo' && item.TAModelNo === currentModel))
                ));

            if (questionsWithSameId.length === 1) {
                this.returnPrevError({
                    questionIndex: questions.indexOf(questionsWithSameId[0])
                });
            }
        }
    }

    returnPrevError({questionIndex}) {
        const {questionStore} = this.props;
        const {errors} = questionStore;

        const currentError = errors[questionIndex];

        const prevNameError = currentError.get('TAQuestionName2');
        const prevModelError = currentError.get('TAModelNo2');

        const currentNameError = currentError.get('TAQuestionName');
        const currentModelError = currentError.get('TAModelNo');

        if (currentNameError && currentNameError === INVALID_ID_ERROR_MESSAGE) {
            currentError.set('TAQuestionName', prevNameError);
        }
        if (!currentError.get('TAQuestionName')) {
            currentError.delete('TAQuestionName');
        }
        if (currentModelError && currentModelError === INVALID_ID_ERROR_MESSAGE) {
            currentError.set('TAModelNo', prevModelError);
        }
        if (!currentError.get('TAModelNo')) {
            currentError.delete('TAModelNo');
        }

        currentError.delete('TAQuestionName2');
        currentError.delete('TAModelNo2');
    }

    render() {
        const {currentQuestionIndex, helpLine, name, questionStore} = this.props;
        const {errors} = questionStore;

        const currentError = errors[currentQuestionIndex];

        return (
            <label className="window__question-field">
                <Tooltip events delay={100}/>

                <span className="window__question-field_title">{name}</span>
                <input type="text" className="form-control" value={this.state.currentValue === undefined ? '' : this.state.currentValue}
                       onChange={this.handleChange} required={currentError.get(name) !== undefined}/>
                <img src={InfoIcon} className="window_icon" alt="Help" data-rh={helpLine} data-rh-at="right"/>
                <span className="window__question-field_error">{
                    currentError.get(name)
                }</span>
            </label>
        )
    }
}

QuestionField.propTypes = {
    name: propTypes.string.isRequired,
    isRequired: propTypes.bool.isRequired,
    type: propTypes.func.isRequired,
    patternExplanation: propTypes.string,
    placeholder: propTypes.string,
    helpLine: propTypes.string,

    //can't use just componentStore because this component doesn't update when currentQuestionIndex updates
    currentQuestionIndex: propTypes.number.isRequired,
    //is needed to know if questionList changed
    currentQuestionsLength: propTypes.number.isRequired
};

export default QuestionField;