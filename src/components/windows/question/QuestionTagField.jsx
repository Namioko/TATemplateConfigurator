import {WithContext as ReactTags} from 'react-tag-input';
import React from 'react';
import {observer, inject} from 'mobx-react';
import InfoIcon from '../../../assets/img/icons/ic_help.svg';
import propTypes from 'prop-types';
import Tooltip from '../../ui/Tooltip';

const QuestionTagField = ({componentStore, questionStore, ...props}) => {
    const {name, pattern, isRequired, patternExplanation, placeholder, helpLine} = props;
    const {currentQuestionIndex} = componentStore;
    const {questions, errors, requiredErrorMessage} = questionStore;
    const currentQuestionErrors = errors[currentQuestionIndex];

    let tags = questions[currentQuestionIndex][name].map((item, index) => {
        return {id: index, text: item};
    });

    const handleAddition = (value) => {
        if (pattern === undefined
            || (pattern !== undefined && pattern.test(value))) {
            tags.push({
                id: tags.length + 1,
                text: value
            });
            questions[currentQuestionIndex][name] = tags.map(item => {
                return item.text;
            });

            if (isRequired) {
                currentQuestionErrors.delete(name);
            }
        } else {
            if (isRequired) {
                currentQuestionErrors.set(name, requiredErrorMessage);
            } else {
                currentQuestionErrors.delete(name);
            }
        }
    };
    const handleInputChange = (value) => {
        if (pattern !== undefined && !pattern.test(value)) {
            currentQuestionErrors.set(name, `* invalid value (${patternExplanation})`);
        } else {
            if (isRequired && tags.length <= 0) {
                currentQuestionErrors.set(name, requiredErrorMessage);
            } else {
                currentQuestionErrors.delete(name);
            }
        }
    };
    const handleDelete = (index) => {
        tags.splice(index, 1);
        questions[currentQuestionIndex][name].splice(index, 1);

        if (isRequired && tags.length <= 0) {
            currentQuestionErrors.set(name, requiredErrorMessage);
        }
    };

    return (
        //extract tooltip with icon to separate component
        <label className="question-window__question-field">
            <Tooltip events delay={100} />

            <span>{name}</span>
            <ReactTags tags={tags} handleDelete={handleDelete} handleAddition={handleAddition} handleInputChange={handleInputChange}
                       placeholder={placeholder} autofocus={false}/>
            <img src={InfoIcon} className="question-window_icon" alt="Help" data-rh={helpLine} data-rh-at="right"/>
            <span className="question-window__question-field_error">{currentQuestionErrors.get(name)}</span>
        </label>
    )
};

QuestionTagField.propTypes = {
    name: propTypes.string.isRequired,
    isRequired: propTypes.bool,
    patternExplanation: propTypes.string,
    helpLine: propTypes.string,
    placeholder: propTypes.string
};

export default inject('componentStore', 'questionStore')(observer(QuestionTagField));