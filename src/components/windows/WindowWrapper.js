import React from 'react';
import {observer, inject} from 'mobx-react';
import QuestionWindow from './QuestionWindow';
import QuestionButtonsWrapper from './QuestionButtonsWrapper';

const WindowWrapper = () => {
        return (
            <div className="window-wrapper">
                <QuestionButtonsWrapper/>
                <QuestionWindow/>
                <QuestionButtonsWrapper/>
            </div>
        )
    }
;

export default observer(WindowWrapper);