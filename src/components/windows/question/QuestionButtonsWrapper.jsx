import React from 'react';
import {observer, inject} from 'mobx-react';
import LeftIcon from '../../../assets/img/icons/ic_arrow_left.svg';
import RightIcon from '../../../assets/img/icons/ic_arrow_right.svg';

const QuestionButtonsWrapper = inject('componentStore', 'questionStore')(observer(({componentStore, questionStore}) => {
    const {currentQuestionIndex} = componentStore;
    const {questions} = questionStore;

    return (
        currentQuestionIndex >= 0 && questions.length > 0 &&
        <div className="window-buttons">
            <div className="window-buttons__add-container">
                <WindowAddBeforeButton/>
                <WindowAddAfterButton/>
            </div>
            <div className="window-buttons__nav-container">
                <WindowPrevButton/>
                <WindowNextButton/>
            </div>
        </div>
    )
}));

const WindowAddBeforeButton = inject('componentStore', 'questionStore')(observer(({componentStore, questionStore}) => {
    const {currentQuestionIndex} = componentStore;
    const {addQuestion} = questionStore;

    const handleClick =
        () => {
            addQuestion({index: currentQuestionIndex});
        };

    return (
        <button className="green-button window-buttons_add_before"
                onClick={handleClick}>
            + Before
        </button>
    )
}));

const WindowAddAfterButton = inject('componentStore', 'questionStore')(observer(({componentStore, questionStore}) => {
    const {currentQuestionIndex, changeCurrentQuestion} = componentStore;
    const {addQuestion} = questionStore;

    const handleClick =
        () => {
            addQuestion({index: currentQuestionIndex + 1});
            changeCurrentQuestion({chosenQuestionIndex: currentQuestionIndex + 1});
        };

    return (
        <button className="green-button window-buttons_add_after"
                onClick={handleClick}>
            + After
        </button>
    )
}));

const WindowPrevButton = inject('componentStore')(observer(({componentStore}) => {
    const {currentQuestionIndex, changeCurrentQuestion} = componentStore;

    const handleClick =
        () => {
            if (currentQuestionIndex > 0) {
                changeCurrentQuestion({chosenQuestionIndex: currentQuestionIndex - 1});
            }
        };

    return (
        <img src={LeftIcon} alt="Prev"
            className={'gray-button window-buttons_arrow window-buttons_arrow-prev'}
            onClick={handleClick}>
        </img>
    )
}));

const WindowNextButton = inject('componentStore', 'questionStore')(observer(({componentStore, questionStore}) => {
    const {currentQuestionIndex, changeCurrentQuestion} = componentStore;
    const {questions} = questionStore;

    const handleClick =
        () => {
            if (currentQuestionIndex < questions.length - 1) {
                changeCurrentQuestion({chosenQuestionIndex: currentQuestionIndex + 1});
            }
        };

    return (
        <img src={RightIcon} alt="Next"
            className={'gray-button window-buttons_arrow window-buttons_arrow-next'}
            onClick={handleClick}>
        </img>
    )
}));

export default QuestionButtonsWrapper;