import React from 'react';
import {observer, inject} from 'mobx-react';
import classNames from 'classnames';

const QuestionButtonsWrapper = ({configurationStore}) => {
    const wrapperClassName = classNames({
        'question-window__buttons': true,
        'hidden': configurationStore.chosenQuestionIndex < 0
    });

    return (
        <div className={wrapperClassName}>
            <div className="add-container">
                <button className={'green-button question-window__buttons_add-before'}
                        onClick={() => configurationStore.addQuestion({index: configurationStore.chosenQuestionIndex})}>
                    + Before
                </button>
                <button className={'green-button question-window__buttons_add-after'}
                        onClick={() => configurationStore.addQuestion({index: configurationStore.chosenQuestionIndex + 1})}>
                    + After
                </button>
            </div>
            <div className="nav-container">
                <button
                    className={'gray-button question-window__buttons_arrow question-window__buttons_arrow-prev'}
                    onClick={() => configurationStore.changeCurrentQuestion({chosenQuestionIndex: configurationStore.chosenQuestionIndex - 1})}>
                    &#129136;
                </button>
                <button
                    className={'gray-button question-window__buttons_arrow question-window__buttons_arrow-next'}
                    onClick={() => configurationStore.changeCurrentQuestion({chosenQuestionIndex: configurationStore.chosenQuestionIndex + 1})}>
                    &#129138;
                </button>
            </div>
        </div>
    )
};

export default inject('configurationStore')(observer(QuestionButtonsWrapper));