import React from 'react';
import {observer, inject} from 'mobx-react';
import classNames from 'classnames';

const QuestionWindow = ({componentStore, questionStore}) => {
    const className = classNames({
        'question-window': true,
        'hidden': componentStore.currentQuestionIndex === -1
        // TODO: conditional rendering
    });
    const question = questionStore.questions[componentStore.currentQuestionIndex];

    return (
        <div className={className}>
            <div className="question-window_header">
                <span className="question-window_header_title">
                    {
                        componentStore.currentQuestionIndex !== -1 && question.TAQuestionName
                    }
                </span>
            </div>
        </div>
    )
};

export default inject('componentStore', 'questionStore')(observer(QuestionWindow));