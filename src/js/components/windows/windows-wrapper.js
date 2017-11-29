import React from 'react';
import {observer, inject} from 'mobx-react';
import QuestionWindow from './question-window';
import QuestionButtonsWrapper from './question-buttons-wrapper';

const WindowsWrapper = ({configurationStore}) => {
    let questionWindows = [];

    configurationStore.questions.forEach((value, index) => {
        questionWindows.push(<QuestionWindow key={index} index={index}/>)
    });

    return (
        <div className={'window'}>
            <QuestionButtonsWrapper/>
            {questionWindows}
            <QuestionButtonsWrapper/>
        </div>
    )
};

export default inject('configurationStore')(observer(WindowsWrapper));