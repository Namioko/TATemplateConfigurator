import React from 'react';
import {observer, inject} from 'mobx-react';
import QuestionWindow from './QuestionWindow';
import QuestionButtonsWrapper from './QuestionButtonsWrapper';

const WindowsWrapper = ({configurationStore}) => {
        return (
            <div className={'window'}>
                <QuestionButtonsWrapper/>
                {
                    configurationStore.chosenQuestionIndex !== -1 &&
                    <QuestionWindow/>
                }
                <QuestionButtonsWrapper/>
            </div>
        )
    }
;

export default inject('configurationStore')(observer(WindowsWrapper));