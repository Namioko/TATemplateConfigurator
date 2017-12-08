import React from 'react';
import {observer, inject} from 'mobx-react';
import QuestionField from './QuestionField';
import QuestionTagField from './QuestionTagField';

const QuestionWindow = ({componentStore, questionStore}) => {
    const {currentQuestionIndex} = componentStore;
    const {questions, properties} = questionStore;
    const currentQuestion = questions[currentQuestionIndex];

    return (
        componentStore.currentQuestionIndex >= 0 &&
        <div className="question-window">
            <div className="question-window_header">
                <span className="question-window_header_title">
                    {
                        currentQuestion.TAQuestionName
                            ? currentQuestion.TAQuestionName
                            : `q${currentQuestionIndex}`
                    }
                </span>
            </div>
            <div className="question-window__content">
                <div className="question-window__question-field-list">
                    {
                        properties.map((property) => {
                            if(!property.isArray) {
                                return <QuestionField key={property.name} {...property}
                                                      currentQuestionIndex={currentQuestionIndex}/>
                            } else {
                                return <QuestionTagField key={property.name} {...property}
                                               currentQuestionIndex={currentQuestionIndex}/>
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
};

export default inject('componentStore', 'questionStore')(observer(QuestionWindow));