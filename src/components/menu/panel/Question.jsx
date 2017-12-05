import React from 'react';
import {observer, inject} from 'mobx-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Question = ({configurationStore, ...props}) => {
    const className = classNames({
        'question-list_question': true,
        'question-list_question_chosen': configurationStore.chosenQuestionIndex === props.index //TODO: replace index with ID
    });

    return (
        <div className={className}
             onClick={() => configurationStore.changeCurrentQuestion({chosenQuestionIndex: props.index})}>
            <div className="question-list_question-icon"/>
            {
                configurationStore.questions[props.index].TAQuestionName === undefined
                    ? `q${props.index}`
                    : configurationStore.questions[props.index].TAQuestionName
            }
        </div>
    )
};

Question.propTypes = {
    index: PropTypes.number
};

export default inject('configurationStore')(observer(Question));