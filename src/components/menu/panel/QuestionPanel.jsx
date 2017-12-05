import React from 'react';
import {PanelHeader} from './PanelHeader';
import classNames from 'classnames';
import Question from './Question';
import {observer, inject} from 'mobx-react';
import configurationStore from '../../../stores/ConfigurationStore';

const QuestionPanel = () => {
    return (
        <div>
            <PanelHeader name="TAQuestions"/>
            <MenuQuestionAddButton/>
            <QuestionList/>
        </div>
    );
};

const MenuQuestionAddButton = inject('configurationStore')(observer(({configurationStore}) => {
    const className = classNames({
        'add-button': true,
        'hidden': configurationStore.chosenQuestionIndex >= 0
    });
    const onClickHandler = () => configurationStore.addQuestion({index: configurationStore.chosenQuestionIndex});

    return (
        <div className={className}>
            <button className="green-button"
                    onClick={onClickHandler}>
                + Add
            </button>
        </div>
    )
}));

const QuestionList = inject('configurationStore')(observer(({configurationStore}) => {
    const {questions} = configurationStore;

    return (
        <div className='question-list'>
            {questions.map((item, key) => (
                <Question key={key} index={key}/>
            ))}
        </div>
    )
}));

export default observer(QuestionPanel);