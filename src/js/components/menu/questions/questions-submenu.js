import React from 'react';
import {observer, inject} from 'mobx-react';
import Question from "./question";
import SubmenuHeader from "../submenu-header";
import classNames from 'classnames';

const QuestionSubmenu = ({configurationStore}) => { //to export
    const firstAddButtonClassName = classNames({
        'question-window__buttons_add': true,
        'question-window__buttons_first': true,
        'question-window__buttons_hidden': configurationStore.chosenQuestionIndex >= 0
    });

    let questions = [];

    configurationStore.questions.forEach((value, index) => {
        questions.push(<Question key={index} index={index}/>)
    });

    return (
        <div className={'menu__submenu'}>
            <SubmenuHeader name={'TAQuestions'}/>
            <button className={firstAddButtonClassName}
                    onClick={() => configurationStore.addQuestion({index: configurationStore.chosenQuestionIndex})}>
                + Add
            </button>
            {questions}
        </div>
    )
};

export default inject('configurationStore')(observer(QuestionSubmenu));