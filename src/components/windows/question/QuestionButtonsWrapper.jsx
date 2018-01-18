import React from 'react';
import {observer, inject} from 'mobx-react';
import WindowAddButton from './buttons/WindowAddButton';
import WindowPrevButton from './buttons/WindowPrevButton';
import WindowNextButton from './buttons/WindowNextButton';

const QuestionButtonsWrapper = inject('componentStore', 'questionStore')(observer(({componentStore, questionStore}) => {

    const {currentQuestionIndex, changeCurrentQuestion} = componentStore;
    const {questions, addQuestion} = questionStore;

    const addQuestionBefore = () => {
        addQuestion({index: currentQuestionIndex});
    };

    const addQuestionAfter = () => {
        addQuestion({index: currentQuestionIndex + 1});
        changeCurrentQuestion({chosenQuestionIndex: currentQuestionIndex + 1});
    };

    return (
        currentQuestionIndex >= 0 && questions.length > 0 &&
        <div className="window-buttons">
            <div className="window-buttons__add-container">
                <WindowAddButton
                    className="green-button window-buttons_add_before"
                    text="+ Before"
                    title="Add new question before the current one"
                    onClick={addQuestionBefore}/>
                <WindowAddButton
                    className="green-button window-buttons_add_after"
                    text="+ After"
                    title="Add new question after the current one"
                    onClick={addQuestionAfter}/>
            </div>
            <div className="window-buttons__nav-container">
                <WindowPrevButton/>
                <WindowNextButton/>
            </div>
        </div>
    )
}));

export default QuestionButtonsWrapper;