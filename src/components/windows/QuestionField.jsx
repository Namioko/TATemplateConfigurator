import React from 'react';
import {observer, inject} from 'mobx-react';

const QuestionField = ({componentStore, questionStore, ...props}) => {
    return (
        <label className="question-window_question-field">
            <span>{props.fieldName}</span>
            <input type="text" className="form-control"
                   defaultValue={questionStore.questions[componentStore.currentQuestionIndex][props.fieldName]}/>
        </label>
    )
};

export default inject('componentStore', 'questionStore')(observer(QuestionField));