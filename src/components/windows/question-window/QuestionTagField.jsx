import {WithContext as ReactTags} from 'react-tag-input';
import React from 'react';
import {observer, inject} from 'mobx-react';
import InfoIcon from '../../../assets/img/icons/ic_info.svg';

const QuestionTagField = ({componentStore, questionStore, ...props}) => {
    const {currentQuestionIndex} = componentStore;
    const {questions} = questionStore;

    const tags = questions[currentQuestionIndex][props.name];

    const handleAddition = (tag) => {
        tags.push({
            id: tags.length + 1,
            text: tag
        });
    };
    const handleInputChange = (value) => {
        if (props.pattern === undefined
            || (props.pattern !== undefined && props.pattern.test(value))) {
            error = '';
        } else {
            error = '* invalid value';
        }
    };
    const handleDelete = (index) => {
        tags.splice(index, 1);
    };

    let error = ''; //TODO: move errors to componentStore

    return (
        <label className="question-window__question-field">
            <span>{props.name}</span>
            <ReactTags tags={tags} handleDelete={handleDelete} handleAddition={handleAddition} handleInputChange={handleInputChange}
                       placeholder={props.placeholder} autofocus={false}/>
            <img src={InfoIcon} className="question-window_icon" alt="Info" title={props.helpLine}/>
            <span className="question-window__question-field_error">{error}</span>
        </label>
    )
};

export default inject('componentStore', 'questionStore')(observer(QuestionTagField));