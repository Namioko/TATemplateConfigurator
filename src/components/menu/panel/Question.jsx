import React from 'react';
import {observer, inject} from 'mobx-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Question = ({componentStore, questionStore, ...props}) => {
    const className = classNames({
        'question-list_question': true,
        'question-list_question_chosen': componentStore.currentQuestionIndex === props.index //TODO: replace index with ID
    });

    return (
        <div className={className}
             onClick={() => componentStore.changeCurrentQuestion({chosenQuestionIndex: props.index})}>
            <div className="question-list_question-icon"/>
            {
                questionStore.questions[props.index].TAQuestionName === undefined
                    ? `q${props.index}`
                    : questionStore.questions[props.index].TAQuestionName
            }
        </div>
    )
};

Question.propTypes = {
    index: PropTypes.number
};

export default inject('componentStore', 'questionStore')(observer(Question));