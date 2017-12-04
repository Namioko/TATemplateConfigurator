import React from 'react';
import {observer, inject} from 'mobx-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const QuestionWindow = ({configurationStore, ...props}) => {
    const className = classNames({
        'question-window': true,
        'question-window_chosen': configurationStore.chosenQuestionIndex === props.index
    });

    const question = configurationStore.questions[configurationStore.chosenQuestionIndex];

    return (
        <div className={className}>
            <div className={'question-window_header'}>
                <span className="question-window_header_title">{question.TAQuestionName}</span>
            </div>
        </div>
    )
};

QuestionWindow.propTypes = {
    index: PropTypes.number
};

export default inject('configurationStore')(observer(QuestionWindow));