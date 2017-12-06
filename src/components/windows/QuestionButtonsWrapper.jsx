import React from 'react';
import {observer, inject} from 'mobx-react';
import classNames from 'classnames';

const QuestionButtonsWrapper = ({componentStore, questionStore}) => {
    const wrapperClassName = classNames({
        'window-buttons': true,
        'hidden': componentStore.currentQuestionIndex < 0
        // TODO: conditional rendering
    });

    const onBeforeClickHandler =
        () => {
            questionStore.addQuestion({index: componentStore.currentQuestionIndex});
            componentStore.changeCurrentQuestion({chosenQuestionIndex: componentStore.currentQuestionIndex});
        };
    const onAfterClickHandler =
        () => {
            questionStore.addQuestion({index: componentStore.currentQuestionIndex + 1});
            componentStore.changeCurrentQuestion({chosenQuestionIndex: componentStore.currentQuestionIndex + 1});
        };
    const onPrevClickHandler =
        () => {
            //TODO: make it better
            if (componentStore.currentQuestionIndex > 0) {
                componentStore.changeCurrentQuestion({chosenQuestionIndex: componentStore.currentQuestionIndex - 1});
            }
        };
    const onNextClickHandler =
        () => {
            //TODO: make it better
            if (componentStore.currentQuestionIndex < questionStore.questions.length - 1) {
                componentStore.changeCurrentQuestion({chosenQuestionIndex: componentStore.currentQuestionIndex + 1});
            }
        };

    return (
        <div className={wrapperClassName}>
            <div className="window-buttons__add-container">
                <button className="green-button window-buttons_add-before"
                        onClick={onBeforeClickHandler}>
                    + Before
                </button>
                <button className="green-button window-buttons_add-after"
                        onClick={onAfterClickHandler}>
                    + After
                </button>
            </div>
            <div className="window-buttons__nav-container">
                <button
                    className={'gray-button window-buttons_arrow window-buttons_arrow-prev'}
                    onClick={onPrevClickHandler}>
                    &#129136;
                </button>
                <button
                    className={'gray-button window-buttons_arrow window-buttons_arrow-next'}
                    onClick={onNextClickHandler}>
                    &#129138;
                </button>
            </div>
        </div>
    )
};

export default inject('componentStore', 'questionStore')(observer(QuestionButtonsWrapper));