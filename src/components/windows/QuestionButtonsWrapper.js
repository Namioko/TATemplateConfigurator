import React from 'react';
import {observer, inject} from 'mobx-react';
import classNames from 'classnames';

const QuestionButtonsWrapper = ({configurationStore}) => {
    const wrapperClassName = classNames({
        'window-buttons': true,
        'hidden': configurationStore.chosenQuestionIndex < 0
    });

    const onBeforeClickHandler =
        () => configurationStore.addQuestion({index: configurationStore.chosenQuestionIndex});
    const onAfterClickHandler =
        () => configurationStore.addQuestion({index: configurationStore.chosenQuestionIndex + 1});
    const onPrevClickHandler =
        () => configurationStore.changeCurrentQuestion({chosenQuestionIndex: configurationStore.chosenQuestionIndex - 1});
    const onNextClickHandler =
        () => configurationStore.changeCurrentQuestion({chosenQuestionIndex: configurationStore.chosenQuestionIndex + 1});

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

export default inject('configurationStore')(observer(QuestionButtonsWrapper));