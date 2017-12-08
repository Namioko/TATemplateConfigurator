import React from 'react';
import {observer, inject} from 'mobx-react';

const QuestionButtonsWrapper = inject('componentStore')(observer(({componentStore}) => {
    const {currentQuestionIndex} = componentStore;

    return (
        currentQuestionIndex >= 0 &&
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
    const {currentQuestionIndex, changeCurrentQuestion} = componentStore;
    const {addQuestion} = questionStore;

    const handleClick =
        () => {
            changeCurrentQuestion({chosenQuestionIndex: currentQuestionIndex});
            addQuestion({index: currentQuestionIndex});
        };

    return (
        <button className="green-button window-buttons_add-before"
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
            changeCurrentQuestion({chosenQuestionIndex: currentQuestionIndex + 1});
            addQuestion({index: currentQuestionIndex});
        };

    return (
        <button className="green-button window-buttons_add-after"
                onClick={handleClick}>
            + After
        </button>
    )
}));

const WindowPrevButton = inject('componentStore')(observer(({componentStore}) => {
    const {currentQuestionIndex, changeCurrentQuestion} = componentStore;

    const handleClick =
        () => {
            //TODO: make it better
            if (currentQuestionIndex > 0) {
                changeCurrentQuestion({chosenQuestionIndex: currentQuestionIndex - 1});
            }
        };

    return (
        <button
            className={'gray-button window-buttons_arrow window-buttons_arrow-prev'}
            onClick={handleClick}>
            &#129136;
        </button>
    )
}));

const WindowNextButton = inject('componentStore', 'questionStore')(observer(({componentStore, questionStore}) => {
    const {currentQuestionIndex, changeCurrentQuestion} = componentStore;
    const {questions} = questionStore;

    const handleClick =
        () => {
            //TODO: make it better
            if (currentQuestionIndex < questions.length - 1) {
                changeCurrentQuestion({chosenQuestionIndex: currentQuestionIndex + 1});
            }
        };

    return (
        <button
            className={'gray-button window-buttons_arrow window-buttons_arrow-next'}
            onClick={handleClick}>
            &#129138;
        </button>
    )
}));

export default observer(QuestionButtonsWrapper);