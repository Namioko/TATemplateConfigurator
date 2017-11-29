import React from 'react';
import {observer, inject} from 'mobx-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const QuestionWindow = ({configurationStore, ...props}) => {
    const className = classNames({
        'windows__question': true,
        'windows__question-chosen': configurationStore.chosenQuestionIndex === props.index
    });

    return (
        <div className={className}>
            <div className={'windows__question__buttons'}>
                <button className={'windows__question__buttons_add' +
                ' windows__question__buttons_add-before'}
                        onClick={() => configurationStore.addQuestion({index: props.index})}>
                    + Before
                </button>
                <button className={'windows__question__buttons_add' +
                ' windows__question__buttons_add-after'}
                        onClick={() => configurationStore.addQuestion({index: props.index + 1})}>
                    + After
                </button>
                <button
                    className={'windows__question__buttons_arrow' +
                    ' windows__question__buttons_arrow-prev'}
                    onClick={() => configurationStore.changeCurrentQuestion({chosenQuestionIndex: props.index - 1})}>&#129136;</button>
                <button
                    className={'windows__question__buttons_arrow' +
                    ' windows__question__buttons_arrow-next'}
                    onClick={() => configurationStore.changeCurrentQuestion({chosenQuestionIndex: props.index + 1})}>&#129138;</button>
            </div>
            <div className={'windows__question_main-part'}>
                <div className={'windows__question_header'}/>
            </div>
            <div className={'windows__question__buttons'}>
                <button className={'windows__question__buttons_add' +
                ' windows__question__buttons_add-before'}
                        onClick={() => configurationStore.addQuestion({index: props.index})}>
                    + Before
                </button>
                <button className={'windows__question__buttons_add' +
                ' windows__question__buttons_add-after'}
                        onClick={() => configurationStore.addQuestion({index: props.index + 1})}>
                    + After
                </button>
                <button
                    className={'windows__question__buttons_arrow' +
                    ' windows__question__buttons_arrow-prev'}
                    onClick={() => configurationStore.changeCurrentQuestion({chosenQuestionIndex: props.index - 1})}>&#129136;</button>
                <button
                    className={'windows__question__buttons_arrow' +
                    ' windows__question__buttons_arrow-next'}
                    onClick={() => configurationStore.changeCurrentQuestion({chosenQuestionIndex: props.index + 1})}>&#129138;</button>
            </div>
        </div>
    )
};

QuestionWindow.propTypes = {
    index: PropTypes.number
};

export default inject('configurationStore')(observer(QuestionWindow));