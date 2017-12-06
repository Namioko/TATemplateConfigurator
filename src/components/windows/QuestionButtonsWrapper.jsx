import React from 'react';
import {observer, inject} from 'mobx-react';

const QuestionButtonsWrapper = inject('componentStore')(observer(({componentStore}) => {
    return (
        componentStore.currentQuestionIndex >= 0 &&
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
    const handleClick =
        () => {
            componentStore.changeCurrentQuestion({chosenQuestionIndex: componentStore.currentQuestionIndex});
            questionStore.addQuestion({index: componentStore.currentQuestionIndex});
        };

    return (
        <button className="green-button window-buttons_add-before"
                onClick={handleClick}>
            + Before
        </button>
    )
}));

const WindowAddAfterButton = inject('componentStore', 'questionStore')(observer(({componentStore, questionStore}) => {
    const handleClick =
        () => {
            componentStore.changeCurrentQuestion({chosenQuestionIndex: componentStore.currentQuestionIndex + 1});
            questionStore.addQuestion({index: componentStore.currentQuestionIndex});
        };

    return (
        <button className="green-button window-buttons_add-after"
                onClick={handleClick}>
            + After
        </button>
    )
}));

const WindowPrevButton = inject('componentStore')(observer(({componentStore}) => {
    const handleClick =
        () => {
            //TODO: make it better
            if (componentStore.currentQuestionIndex > 0) {
                componentStore.changeCurrentQuestion({chosenQuestionIndex: componentStore.currentQuestionIndex - 1});
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
    const handleClick =
        () => {
            //TODO: make it better
            if (componentStore.currentQuestionIndex < questionStore.questions.length - 1) {
                componentStore.changeCurrentQuestion({chosenQuestionIndex: componentStore.currentQuestionIndex + 1});
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