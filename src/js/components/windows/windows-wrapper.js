import React from 'react';
import {observer, inject} from 'mobx-react';
import QuestionWindow from "./question-window";

const WindowsWrapper = ({configurationStore}) => {
    let questionWindows = [];

    configurationStore.questions.forEach((value, index) => {
        questionWindows.push(<QuestionWindow key={index} index={index}/>)
    });

    return (
        <div className={'windows'}>
            {questionWindows}
        </div>
    )
};

export default inject('configurationStore')(observer(WindowsWrapper));