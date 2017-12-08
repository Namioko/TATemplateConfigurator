import React from 'react';
import {observer, inject} from 'mobx-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Question = ({componentStore, questionStore, ...props}) => {
    const {currentQuestionIndex, changeCurrentQuestion} = componentStore;
    const {questions} = questionStore;

    const className = classNames({
        'question-list_question': true,
        'question-list_question_chosen': currentQuestionIndex === props.index //TODO: replace index with ID
    });

    return (
        <div className={className}
             onClick={() => changeCurrentQuestion({chosenQuestionIndex: props.index})}>
            <div className="question-list_question-icon"/>
            {
                questions[props.index].TAQuestionName
                    ? questions[props.index].TAQuestionName
                    : `q${props.index}`
            }
        </div>
    )
};

Question.propTypes = {
    index: PropTypes.number.isRequired
};

export default inject('componentStore', 'questionStore')(observer(Question));