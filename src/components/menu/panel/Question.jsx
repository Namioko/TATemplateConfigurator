import React from 'react';
import {observer, inject} from 'mobx-react';
import classNames from 'classnames';
import propTypes from 'prop-types';

const Question = ({componentStore, questionStore, ...props}) => {
    const {currentQuestionIndex, changeCurrentQuestion} = componentStore;
    const {deleteQuestion, getQuestionId} = questionStore;

    const className = classNames({
        'question-list_question': true,
        'question-list_question_chosen': currentQuestionIndex === props.index
    });

    let isDeleteClicked = false;

    const handleDeleteClick = () => {
        deleteQuestion({index: props.index});
        changeCurrentQuestion(currentQuestionIndex - 1);
        isDeleteClicked = true;
    };
    const handleLineClick = () => {
        if (isDeleteClicked) {
            isDeleteClicked = false;
        } else {
            changeCurrentQuestion(props.index);
        }
    };

    return (
        <div className={className} onClick={handleLineClick}>
            <span> {getQuestionId({index: props.index})} </span>
            {
                props.index === currentQuestionIndex &&
                <div className="question-list_delete-btn" onClick={handleDeleteClick}/>
            }
        </div>
    )
};

Question.propTypes = {
    index: propTypes.number.isRequired
};

export default inject('componentStore', 'questionStore')(observer(Question));