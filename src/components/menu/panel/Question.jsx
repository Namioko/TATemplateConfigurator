import React from 'react';
import {observer, inject} from 'mobx-react';
import classNames from 'classnames';
import propTypes from 'prop-types';

const Question = ({componentStore, questionStore, ...props}) => {
    const {currentQuestionIndex, changeCurrentQuestion} = componentStore;
    const {questions, deleteQuestion} = questionStore;
    const currentQuestion = questions[props.index];

    const className = classNames({
        'question-list_question': true,
        'question-list_question_chosen': currentQuestionIndex === props.index //TODO: replace index with ID
    });

    let isDeleteClicked = false;

    const handleDeleteClick = () => {
        deleteQuestion({index: props.index});
        changeCurrentQuestion({chosenQuestionIndex: currentQuestionIndex - 1});
        isDeleteClicked = true;
    };
    const handleLineClick = () => {
        if (isDeleteClicked) {
            isDeleteClicked = false;
        } else {
            changeCurrentQuestion({chosenQuestionIndex: props.index});
        }
    };

    return (
        <div className={className} onClick={handleLineClick}>
            <span>
                {
                    currentQuestion.TAQuestionName
                        ? currentQuestion.TAQuestionName
                        : `q${props.index}`
                }
                {
                    currentQuestion.TAModelNo && `-${currentQuestion.TAModelNo}`
                }
            </span>
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