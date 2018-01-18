import React from 'react';
import {observer, inject} from 'mobx-react';
import DeleteIcon from '../../../assets/img/icons/ic_delete.svg';

const QuestionHeader = ({componentStore, questionStore}) => {
    const {currentQuestionIndex, changeCurrentQuestion} = componentStore;
    const {deleteQuestion, getQuestionId} = questionStore;

    const handleDeleteClick = () => {
        deleteQuestion({index: currentQuestionIndex});
        changeCurrentQuestion({chosenQuestionIndex: currentQuestionIndex - 1});
    };

    return (
        <div className="question-window_header">
            <span className="question-window_header_title">
                {getQuestionId({index: currentQuestionIndex})}
            </span>
            <img src={DeleteIcon} className="question-window_icon" alt="Info" onClick={handleDeleteClick} title="Remove this question"/>
        </div>
    )
};

export default inject('componentStore', 'questionStore')(observer(QuestionHeader));