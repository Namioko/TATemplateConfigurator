import React from 'react';
import {observer, inject} from 'mobx-react';
import DeleteIcon from '../../../assets/img/icons/ic_delete.svg';

const QuestionHeader = ({componentStore, questionStore}) => {
    const {currentQuestionIndex, changeCurrentQuestion} = componentStore;
    const {questions, deleteQuestion} = questionStore;
    const currentQuestion = questions[currentQuestionIndex];

    const handleDeleteClick = () => {
        deleteQuestion({index: currentQuestionIndex});
        changeCurrentQuestion({chosenQuestionIndex: currentQuestionIndex - 1});
    };

    return (
        <div className="question-window_header">
            <span className="question-window_header_title">
                {
                    currentQuestion.TAQuestionName
                        ? currentQuestion.TAQuestionName
                        : `q${currentQuestionIndex}`
                }
                {
                    currentQuestion.TAModelNo && `-${currentQuestion.TAModelNo}`
                }
            </span>
            <img src={DeleteIcon} className="question-window_icon" alt="Info" onClick={handleDeleteClick}/>
        </div>
    )
};

export default inject('componentStore', 'questionStore')(observer(QuestionHeader));