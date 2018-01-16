import React from 'react';
import {observer, inject} from 'mobx-react';
import QuestionField from './QuestionField';
import QuestionTagField from './QuestionTagField';
import QuestionHeader from './QuestionHeader';
import {QUESTION_PROPERTIES} from '../../../utils/validation';

const QuestionWindow = ({componentStore, questionStore}) => {
    const {currentQuestionIndex} = componentStore;
    const {questions} = questionStore;

    const makeFieldList = () => {
        let fields = [];

        for(let key in QUESTION_PROPERTIES) {
            const property = QUESTION_PROPERTIES[key];
            if (!property.isArray) {
                fields.push(<QuestionField key={key} name={key} {...property}
                                      currentQuestionIndex={currentQuestionIndex}
                                      currentQuestionsLength={questions.length}/>)
            } else {
                fields.push(<QuestionTagField key={key} name={key} {...property}/>)
            }
        }

        return fields;
    };

    return (
        currentQuestionIndex >= 0 && questions.length > 0 &&
        <div className="question-window">
            <QuestionHeader/>
            <div className="question-window__content">
                <div className="question-window__question-field-list">
                    {
                        makeFieldList()
                    }
                </div>
            </div>
        </div>
    )
};

export default inject('componentStore', 'questionStore')(observer(QuestionWindow));