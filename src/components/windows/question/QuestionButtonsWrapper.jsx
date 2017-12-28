import React from 'react';
import {observer, inject} from 'mobx-react';
import LeftIcon from '../../../assets/img/icons/ic_arrow_left.svg';
import RightIcon from '../../../assets/img/icons/ic_arrow_right.svg';

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
                    onClick={addQuestionBefore}/>
                <WindowAddButton
                    className="green-button window-buttons_add_after"
                    text="+ After"
                    onClick={addQuestionAfter}/>
            </div>
            <div className="window-buttons__nav-container">
                <WindowPrevButton/>
                <WindowNextButton/>
            </div>
        </div>
    )
}));

const WindowAddButton = (props) => {
    return (
        <button className={props.className} onClick={props.onClick}>{props.text}</button>
    )
};

const WindowPrevButton = inject('componentStore')(observer(({componentStore}) => {
    const {currentQuestionIndex, changeCurrentQuestion} = componentStore;

    const handleClick = () => {
        if (currentQuestionIndex > 0) {
            changeCurrentQuestion({chosenQuestionIndex: currentQuestionIndex - 1});
        }
    };

    return (
        <img 
            src={LeftIcon} 
            alt="Prev"
            className="gray-button window-buttons_arrow window-buttons_arrow-prev"
            onClick={handleClick}/>
    )
}));

const WindowNextButton = inject('componentStore', 'questionStore')(observer(({componentStore, questionStore}) => {
    const {currentQuestionIndex, changeCurrentQuestion} = componentStore;
    const {questions} = questionStore;

    const handleClick = () => {
        if (currentQuestionIndex < questions.length - 1) {
            changeCurrentQuestion({chosenQuestionIndex: currentQuestionIndex + 1});
        }
    };

    return (
        <img 
            src={RightIcon} 
            alt="Next"
            className="gray-button window-buttons_arrow window-buttons_arrow-next"
            onClick={handleClick}/>
    )
}));

export default QuestionButtonsWrapper;