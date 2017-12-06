import React from 'react';
import {observer, inject} from 'mobx-react';
import QuestionField from './QuestionField';
import QuestionTagField from './QuestionTagField';

const QuestionWindow = ({componentStore, questionStore}) => {
    const question = questionStore.questions[componentStore.currentQuestionIndex];

    const fieldNames = [];
    for(let key in question) {
        if(question.hasOwnProperty(key)) {
            fieldNames.push(key);
        }
    }

    return (
        componentStore.currentQuestionIndex >= 0 &&
        <div className="question-window">
            <div className="question-window_header">
                <span className="question-window_header_title">
                    {
                        componentStore.currentQuestionIndex !== -1 && question.TAQuestionName
                    }
                </span>
            </div>
            <div className="question-window__content">
                <div className="question-window__question-field-list">
                    <QuestionField fieldName="TAFolderId"/>
                    <QuestionField fieldName="DatasourceId"/>
                    <QuestionField fieldName="DatasourceSchemaId"/>
                    <QuestionField fieldName="DatabaseTableName"/>
                    <QuestionField fieldName="RelationshipColumnName"/>
                    <QuestionField fieldName="TextSeparator"/>
                    <QuestionField fieldName="TAQuestionName"/>
                    <QuestionField fieldName="TAModelNo"/>
                    <QuestionField fieldName="TimeVariableId"/>
                    <QuestionTagField fieldName="VariablesToViewBy"/>
                </div>
            </div>
        </div>
    )
};

export default inject('componentStore', 'questionStore')(observer(QuestionWindow));