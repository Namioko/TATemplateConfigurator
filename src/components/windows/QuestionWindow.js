import React from 'react';
import {observer, inject} from 'mobx-react';
import classNames from 'classnames';

const QuestionWindow = ({configurationStore}) => {
    const className = classNames({
        'question-window': true,
        'hidden': configurationStore.chosenQuestionIndex === -1
    });
    const question = configurationStore.questions[configurationStore.chosenQuestionIndex];

    return (
        <div className={className}>
            <div className="question-window_header">
                <span className="question-window_header_title">
                    {
                        configurationStore.chosenQuestionIndex !== -1 && question.TAQuestionName
                    }
                </span>
            </div>
        </div>
    )
};

export default inject('configurationStore')(observer(QuestionWindow));