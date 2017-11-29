import React from 'react';
import {observer, inject} from 'mobx-react';
import Question from "./question";
import SubmenuHeader from "../submenu-header";

const QuestionSubmenu = ({configurationStore}) => { //to export
    let questions = [];

    configurationStore.questions.forEach((value, index) => {
        questions.push(<Question key={index} index={index}/>)
    });

    return (
        <div className={'menu__submenu'}>
            <SubmenuHeader name={'TAQuestions'}/>
            {questions}
        </div>
    )
};

export default inject('configurationStore')(observer(QuestionSubmenu));