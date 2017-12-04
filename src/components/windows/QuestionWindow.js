import React from 'react';
import {observer, inject} from 'mobx-react';
import PropTypes from 'prop-types';

const QuestionWindow = ({configurationStore}) => {
    const question = configurationStore.questions[configurationStore.chosenQuestionIndex];

    return (
        <div className={'question-window'}>
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