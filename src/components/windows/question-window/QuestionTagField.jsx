import {WithContext as ReactTags} from 'react-tag-input';
import React from 'react';
import {observer, inject} from 'mobx-react';
import InfoIcon from '../../../assets/img/icons/ic_info.svg';
import propTypes from 'prop-types';

const QuestionTagField = ({componentStore, questionStore, ...props}) => {
    const {currentQuestionIndex} = componentStore;
    const {questions, errors, requiredErrorMessage} = questionStore;
    const currentQuestionErrors = errors[currentQuestionIndex];

    let tags = questions[currentQuestionIndex][props.name].map((item, index) => {
        return {id: index, text: item};
    });

    const handleAddition = (value) => {
        if (props.pattern === undefined
            || (props.pattern !== undefined && props.pattern.test(value))) {
            tags.push({
                id: tags.length + 1,
                text: value
            });
            questions[currentQuestionIndex][props.name] = tags.map(item => {
                return item.text;
            });

            if (props.isRequired) {
                currentQuestionErrors.delete(props.name);
            }
        } else {
            if (props.isRequired) {
                currentQuestionErrors.set(props.name, requiredErrorMessage);
            } else {
                currentQuestionErrors.delete(props.name);
            }
        }
    };
    const handleInputChange = (value) => {
        if (props.pattern !== undefined && !props.pattern.test(value)) {
            currentQuestionErrors.set(props.name, `* invalid value (${props.patternExplanation})`);
        } else {
            if (props.isRequired && tags.length <= 0) {
                currentQuestionErrors.set(props.name, requiredErrorMessage);
            } else {
                currentQuestionErrors.delete(props.name);
            }
        }
    };
    const handleDelete = (index) => {
        tags.splice(index, 1);
        questions[currentQuestionIndex][props.name].splice(index, 1);

        if (props.isRequired && tags.length <= 0) {
            currentQuestionErrors.set(props.name, requiredErrorMessage);
        }
    };

    return (
        <label className="question-window__question-field">
            <span>{props.name}</span>
            <ReactTags tags={tags} handleDelete={handleDelete} handleAddition={handleAddition} handleInputChange={handleInputChange}
                       placeholder={props.placeholder} autofocus={false}/>
            <img src={InfoIcon} className="question-window_icon" alt="Info" title={props.helpLine}/>
            <span className="question-window__question-field_error">{currentQuestionErrors.get(props.name)}</span>
        </label>
    )
};

QuestionTagField.propTypes = {
    name: propTypes.string.isRequired,
    isRequired: propTypes.bool,
    isArray: propTypes.bool
};

export default inject('componentStore', 'questionStore')(observer(QuestionTagField));