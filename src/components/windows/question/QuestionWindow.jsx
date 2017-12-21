import React from 'react';
import {observer, inject} from 'mobx-react';
import QuestionField from './QuestionField';
import QuestionTagField from './QuestionTagField';
import QuestionHeader from './QuestionHeader';

const QuestionWindow = ({componentStore, questionStore}) => {
    const {currentQuestionIndex} = componentStore;
    const {questions, properties} = questionStore;

    return (
        currentQuestionIndex >= 0 && questions.length > 0 &&
        <div className="question-window">
            <QuestionHeader/>
            <div className="question-window__content">
                <div className="question-window__question-field-list">
                    {
                        properties.map((property) => {
                            if (!property.isArray) {
                                return <QuestionField key={property.name} {...property}
                                                      currentQuestionIndex={currentQuestionIndex}
                                                      currentQuestionsLength={questions.length}/>
                            } else {
                                return <QuestionTagField key={property.name} {...property}/>
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
};

export default inject('componentStore', 'questionStore')(observer(QuestionWindow));