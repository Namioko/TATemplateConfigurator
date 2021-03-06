import React from 'react';
import QuestionWindow from './question/QuestionWindow';
import QuestionButtonsWrapper from './question/QuestionButtonsWrapper';

const WindowWrapper = () => {
        return (
            <div className="window-wrapper">
                <QuestionButtonsWrapper/>
                <QuestionWindow/>
            </div>
        )
    }
;

export default WindowWrapper;