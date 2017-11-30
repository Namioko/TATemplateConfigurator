import React from 'react';
import { PanelHeader } from './PanelHeader';
import classNames from 'classnames';
import Question from './Question';
import { observer, inject } from 'mobx-react';

const QuestionPanel = ({configurationStore}) => {
    const firstAddButtonClassName = classNames({
        'question-window__buttons_first': true,
        'question-window__buttons_hidden': configurationStore.chosenQuestionIndex >= 0,
        'green-button': true
    });

    const { questions } = configurationStore;

    return (
        <div>
            <PanelHeader name="TAQuestions"/>
            <button className={firstAddButtonClassName}
                    onClick={() => configurationStore.addQuestion({index: configurationStore.chosenQuestionIndex})}>
                + Add
            </button>
            {questions.map((item, key) => (
                <Question key={key} index={key}/>
            ))}
            {questions}
        </div>
    );
};

export default inject('configurationStore')(observer(QuestionPanel));