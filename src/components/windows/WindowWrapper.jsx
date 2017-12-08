import React from 'react';
import {observer} from 'mobx-react';
import QuestionWindow from './QuestionWindow';
import QuestionButtonsWrapper from './QuestionButtonsWrapper';

const WindowWrapper = () => {
        return (
            <div className="window-wrapper">
                <QuestionButtonsWrapper/>
                <QuestionWindow/>
            </div>
        )
    }
;

export default observer(WindowWrapper);