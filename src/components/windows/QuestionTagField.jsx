import {WithContext as ReactTags} from 'react-tag-input';
import React from 'react';
import {observer, inject} from 'mobx-react';

const QuestionTagField = ({componentStore, questionStore, ...props}) => {
    const tags = questionStore.questions[componentStore.currentQuestionIndex][props.fieldName];

    const reactTagClassNames = {
        tags: 'question-window__tags',
        suggestions: 'question-window__tags_suggestions',
        activeSuggestion: 'question-window__tags_activeSuggestion',
        tagInput: 'question-window__tags_tagInput',
        tagInputField: 'question-window__tags_tagInputField',
        selected: 'question-window__tags_selected',
        tag: 'question-window__tags_tag',
        remove: 'question-window__tags_remove'
    };

    const handleAddition = (tag) => {
        tags.push({
            id: tags.length + 1,
            text: tag
        })
    };
    const handleDelete = (index) => {
        tags.splice(index, 1);
    };

    return (
        <label className="question-window_question-field">
            <span>{props.fieldName}</span>
            <ReactTags className={reactTagClassNames} tags={tags} handleDelete={handleDelete} handleAddition={handleAddition}
                       placeholder=""/>
        </label>
    )
};

export default inject('componentStore', 'questionStore')(observer(QuestionTagField));