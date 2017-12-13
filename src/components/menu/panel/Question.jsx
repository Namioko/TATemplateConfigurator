import React from 'react';
import {observer, inject} from 'mobx-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Question = ({componentStore, questionStore, ...props}) => {
    const {currentQuestionIndex, changeCurrentQuestion} = componentStore;
    const {questions, deleteQuestion} = questionStore;

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
        if(isDeleteClicked) {
            isDeleteClicked = false;
        } else {
            changeCurrentQuestion({chosenQuestionIndex: props.index});
        }
    };

    return (
        <div className={className} onClick={handleLineClick}>
            {
                questions[props.index].TAQuestionName
                    ? questions[props.index].TAQuestionName
                    : `q${props.index}`
            }
            {
                props.index === currentQuestionIndex &&
                <div className="question-list_delete-btn" onClick={handleDeleteClick}/>
            }
        </div>
    )
};

Question.propTypes = {
    index: PropTypes.number.isRequired
};

export default inject('componentStore', 'questionStore')(observer(Question));