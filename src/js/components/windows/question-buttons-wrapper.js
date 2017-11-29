import React from 'react';
import {observer, inject} from 'mobx-react';
import classNames from 'classnames';

const QuestionButtonsWrapper = ({configurationStore}) => {
    debugger;
    const wrapperClassName = classNames({
        'question-window__buttons': true,
        'question-window__buttons_hidden': configurationStore.chosenQuestionIndex < 0
    });

    return (
        <div className={wrapperClassName}>
            <button className={'question-window__buttons_add question-window__buttons_add-before'}
                    onClick={() => configurationStore.addQuestion({index: configurationStore.chosenQuestionIndex})}>
                + Before
            </button>
            <button className={'question-window__buttons_add question-window__buttons_add-after'}
                    onClick={() => configurationStore.addQuestion({index: configurationStore.chosenQuestionIndex + 1})}>
                + After
            </button>
            <button
                className={'question-window__buttons_arrow question-window__buttons_arrow-prev'}
                onClick={() => configurationStore.changeCurrentQuestion({chosenQuestionIndex: configurationStore.chosenQuestionIndex - 1})}>
                &#129136;
            </button>
            <button
                className={'question-window__buttons_arrow question-window__buttons_arrow-next'}
                onClick={() => configurationStore.changeCurrentQuestion({chosenQuestionIndex: configurationStore.chosenQuestionIndex + 1})}>
                &#129138;
            </button>
        </div>
    )
};

export default inject('configurationStore')(observer(QuestionButtonsWrapper));